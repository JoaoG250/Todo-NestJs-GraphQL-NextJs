import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CurrentUser } from "src/auth/decorators/currentUser";
import { GqlJwtAuthGuard } from "src/auth/guards/jwtAuth.guard";
import { AuthUser } from "src/auth/types";
import { cleanNullFromBoolean } from "src/prisma/tools/clean";
import { ConnectionArgs } from "src/relay/connection";
import { connectionFromPromisedArray } from "src/relay/connectionArray";
import { parsePaginationArgs } from "src/relay/parseToPrisma";
import { CreateTodoInput } from "./dto/createTodo.input";
import { FilterTodoInput } from "./dto/filterTodo.input";
import { UpdateTodoInput } from "./dto/updateTodo.input";
import { Todo, TodoConnection } from "./models/todo.model";
import { TodoService } from "./todo.service";

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => Todo, { nullable: true })
  async todo(@Args("id", { type: () => ID }) id: string): Promise<Todo | null> {
    return this.todoService.todo({ id });
  }

  @Query(() => TodoConnection)
  @UseGuards(GqlJwtAuthGuard)
  async todos(
    @CurrentUser() user: AuthUser,
    @Args({ type: () => ConnectionArgs }) args: ConnectionArgs,
    @Args("filter", { type: () => FilterTodoInput, nullable: true })
    filter?: FilterTodoInput
  ) {
    const pagination = parsePaginationArgs(args);

    const where: Prisma.TodoWhereInput = { userId: user.id };

    if (filter) {
      where.done = cleanNullFromBoolean(filter.done);
    }

    return connectionFromPromisedArray(
      this.todoService.todos({
        where,
        orderBy: [{ done: "asc" }, { createdAt: "asc" }],
        ...pagination,
      }),
      args
    );
  }

  @Mutation(() => Todo)
  @UseGuards(GqlJwtAuthGuard)
  async createTodo(
    @CurrentUser() user: AuthUser,
    @Args("data") data: CreateTodoInput
  ): Promise<Todo> {
    return this.todoService.createTodo({
      user: { connect: { id: user.id } },
      ...data,
    });
  }

  @Mutation(() => Todo)
  @UseGuards(GqlJwtAuthGuard)
  async updateTodo(
    @CurrentUser() user: AuthUser,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") data: UpdateTodoInput
  ): Promise<Todo> {
    const todo = await this.todoService.todo({ id });

    if (!todo) {
      throw new BadRequestException("Todo not found");
    }

    if (todo.userId !== user.id) {
      throw new UnauthorizedException(
        "You are not authorized to update this todo"
      );
    }

    return this.todoService.updateTodo({
      where: { id },
      data,
    });
  }

  @Mutation(() => Todo)
  @UseGuards(GqlJwtAuthGuard)
  async deleteTodo(
    @CurrentUser() user: AuthUser,
    @Args("id", { type: () => ID }) id: string
  ): Promise<Todo> {
    const todo = await this.todoService.todo({ id });

    if (!todo) {
      throw new BadRequestException("Todo not found");
    }

    if (todo.userId !== user.id) {
      throw new UnauthorizedException(
        "You are not authorized to delete this todo"
      );
    }

    return this.todoService.deleteTodo({ id });
  }
}

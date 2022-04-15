import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/decorators/currentUser";
import { GqlJwtAuthGuard } from "src/auth/guards/jwtAuth.guard";
import { AuthUser } from "src/auth/types";
import { ConnectionArgs } from "src/relay/connection";
import { connectionFromPromisedArray } from "src/relay/connectionArray";
import { parsePaginationArgs } from "src/relay/parseToPrisma";
import { CreateTodoInput } from "./dto/createTodo.input";
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
  async todos(@Args({ type: () => ConnectionArgs }) args: ConnectionArgs) {
    const pagination = parsePaginationArgs(args);

    return connectionFromPromisedArray(
      this.todoService.todos({ ...pagination }),
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

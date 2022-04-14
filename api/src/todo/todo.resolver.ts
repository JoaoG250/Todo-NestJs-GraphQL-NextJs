import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { ConnectionArgs } from "src/relay/connection";
import { connectionFromPromisedArray } from "src/relay/connectionArray";
import { parsePaginationArgs } from "src/relay/parseToPrisma";
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
}

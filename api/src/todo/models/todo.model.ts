import { Field, ObjectType } from "@nestjs/graphql";
import { RelayConnection } from "src/relay/connection";

@ObjectType()
export class Todo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  done: boolean;
}

@ObjectType()
export class TodoConnection extends RelayConnection<Todo>(Todo) {}

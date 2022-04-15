import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTodoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  done: boolean;
}

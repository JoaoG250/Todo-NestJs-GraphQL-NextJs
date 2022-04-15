import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

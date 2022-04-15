import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FilterTodoInput {
  @Field(() => Boolean, { nullable: true })
  done?: boolean | null;
}

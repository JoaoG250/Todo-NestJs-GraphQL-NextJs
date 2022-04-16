import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RelayConnection } from "src/relay/connection";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class UserConnection extends RelayConnection<User>(User) {}

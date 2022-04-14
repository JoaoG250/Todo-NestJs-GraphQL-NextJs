import { Field, ObjectType } from "@nestjs/graphql";
import { RelayConnection } from "src/relay/connection";

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class UserConnection extends RelayConnection<User>(User) {}

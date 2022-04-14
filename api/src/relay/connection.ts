import { Type } from "@nestjs/common";
import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import * as Relay from "./types";

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description:
      "Returns the elements in the list that come before the specified cursor",
  })
  before?: Relay.ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description:
      "Returns the elements in the list that come after the specified cursor",
  })
  after?: Relay.ConnectionCursor;

  @Field(() => Int, {
    nullable: true,
    description: "Returns the first n elements from the list.",
  })
  first?: number;

  @Field(() => Int, {
    nullable: true,
    description: "Returns the last n elements from the list.",
  })
  last?: number;
}

@ObjectType()
class PageInfo implements Relay.PageInfo {
  @Field(() => String, {
    nullable: true,
    description:
      "The cursor corresponding to the first nodes in edges. Null if the connection is empty.",
  })
  startCursor!: Relay.ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description:
      "The cursor corresponding to the last nodes in edges. Null if the connection is empty.",
  })
  endCursor!: Relay.ConnectionCursor;

  @Field(() => Boolean, {
    nullable: false,
    description:
      "Used to indicate whether more edges exist prior to the set defined by the clients arguments.",
  })
  hasPreviousPage!: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description:
      "Used to indicate whether more edges exist following the set defined by the clients arguments.",
  })
  hasNextPage!: boolean;
}

export function RelayConnection<GraphQLType>(
  graphqlType: Type<GraphQLType>
): any {
  const { name } = graphqlType;

  @ObjectType(`${name}Edge`, { isAbstract: true })
  abstract class Edge<GraphQLType> implements Relay.Edge<GraphQLType> {
    @Field(() => String, { nullable: false })
    cursor!: Relay.ConnectionCursor;

    @Field(() => graphqlType, { nullable: false })
    node!: GraphQLType;
  }

  @ObjectType({ isAbstract: true })
  abstract class Connection implements Relay.Connection<GraphQLType> {
    @Field(() => [Edge], { nullable: false })
    edges!: Array<Relay.Edge<GraphQLType>>;

    @Field(() => PageInfo, { nullable: false })
    pageInfo!: PageInfo;
  }

  return Connection;
}

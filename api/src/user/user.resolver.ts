import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { User, UserConnection } from "./models/user.model";
import { UserService } from "./user.service";
import { AuthUser } from "src/auth/types";
import { CurrentUser } from "src/auth/decorators/currentUser";
import { GqlJwtAuthGuard } from "src/auth/guards/jwtAuth.guard";
import { ConnectionArgs } from "src/relay/connection";
import { parsePaginationArgs } from "src/relay/parseToPrisma";
import { connectionFromPromisedArray } from "src/relay/connectionArray";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlJwtAuthGuard)
  async me(@CurrentUser() user: AuthUser) {
    return this.userService.user({ id: user.id });
  }

  @Query(() => User)
  async user(@Args("id", { type: () => String }) id: string) {
    return this.userService.user({ id });
  }

  @Query(() => UserConnection)
  async users(@Args({ type: () => ConnectionArgs }) args: ConnectionArgs) {
    const pagination = parsePaginationArgs(args);

    return connectionFromPromisedArray(
      this.userService.users({ ...pagination }),
      args
    );
  }
}

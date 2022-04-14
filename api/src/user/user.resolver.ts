import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { AuthUser } from "src/auth/types";
import { CurrentUser } from "src/auth/decorators/currentUser";
import { GqlJwtAuthGuard } from "src/auth/guards/jwtAuth.guard";

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
}

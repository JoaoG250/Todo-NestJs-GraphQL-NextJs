import { UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthTokens } from "./models/authTokens.model";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthTokens)
  async login(
    @Args("email", { type: () => String }) email: string,
    @Args("password", { type: () => String }) password: string
  ): Promise<AuthTokens> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Mutation(() => AuthTokens)
  async refreshToken(
    @Args("refreshToken", { type: () => String }) refreshToken: string
  ): Promise<AuthTokens> {
    return this.authService.refreshToken(refreshToken);
  }

  @Mutation(() => Boolean)
  async register(
    @Args("name", { type: () => String }) name: string,
    @Args("email", { type: () => String }) email: string,
    @Args("password", { type: () => String }) password: string
  ): Promise<boolean> {
    return this.authService.register(name, email, password);
  }
}

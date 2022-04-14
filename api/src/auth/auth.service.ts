import bcrypt from "bcrypt";
import config from "config";
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "src/jwt/jwt.service";
import { UserService } from "src/user/user.service";
import { RedisService } from "src/redis/redis.service";
import { AuthJwtPayload, UserWithoutPassword } from "./types";
import { AuthTokens } from "./models/authTokens.model";

const redisRefreshTokenDatabase: number = config.get(
  "redis.refreshTokenDatabase"
);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private redisService: RedisService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.user({
      email,
    });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    const { password: secret, ...result } = user;
    return result;
  }

  async login(user: UserWithoutPassword): Promise<AuthTokens> {
    const payload: AuthJwtPayload = { id: user.id };
    return {
      accessToken: this.jwtService.signAccessToken(payload, user.id),
      refreshToken: await this.jwtService.signRefreshToken(payload, user.id),
    };
  }

  async register(name: string, email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 12);
    await this.userService.createUser({
      name: name,
      email: email,
      password: passwordHash,
    });

    return true;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    let payload: string | JwtPayload;
    try {
      payload = await this.jwtService.verifyRefreshToken(refreshToken);
    } catch (err) {
      throw new ForbiddenException();
    }

    if (typeof payload === "string" || typeof payload.id !== "string") {
      throw new ForbiddenException();
    }

    const check = await this.redisService.checkToken({
      payload,
      database: redisRefreshTokenDatabase,
    });
    if (!check) {
      throw new ForbiddenException();
    }

    const user = await this.userService.user({
      id: payload.id,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const signPayload = { id: user.id };
    return {
      accessToken: this.jwtService.signAccessToken(signPayload, user.id),
      refreshToken: await this.jwtService.signRefreshToken(
        signPayload,
        user.id
      ),
    };
  }
}

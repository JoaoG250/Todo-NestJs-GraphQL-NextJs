import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "src/jwt/jwt.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RedisModule } from "src/redis/redis.module";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Module({
  imports: [PassportModule, JwtModule, RedisModule],
  providers: [JwtStrategy, AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}

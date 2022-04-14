import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "src/jwt/jwt.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RedisModule } from "src/redis/redis.module";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [PassportModule, JwtModule, RedisModule, UserModule],
  providers: [JwtStrategy, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}

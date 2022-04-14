import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";
import { JwtModule } from "./jwt/jwt.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [PrismaModule, RedisModule, JwtModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

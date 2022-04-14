import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";
import { JwtModule } from "./jwt/jwt.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TodoModule } from "./todo/todo.module";

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    JwtModule,
    AuthModule,
    UserModule,
    TodoModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
    }),
  ],
})
export class AppModule {}

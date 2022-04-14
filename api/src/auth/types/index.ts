import { User } from "@prisma/client";

export type UserWithoutPassword = Omit<User, "password">;

export type AuthJwtPayload = { id: string };

export type AuthUser = { id: string };

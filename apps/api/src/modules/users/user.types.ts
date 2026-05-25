import { Prisma, User } from "@prisma/client";

export type CreateUserData = Prisma.UserCreateInput;

export type SafeUser = Omit<User, "password">;

export function toSafeUser(user: User): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser;
}

import { Prisma, User } from "@prisma/client";

export type CreateUserData = Prisma.UserCreateInput;

export type SafeUser = Omit<User, "password">;

// export function toSafeUser(user: User): SafeUser {
//   const { password, ...safeUser } = user;
//   return safeUser;
// }

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    email: user.email,
    userName: user.userName,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt.toISOString(),
  };
}

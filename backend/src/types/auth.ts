import { Prisma } from "@prisma/client";

export const publicUserSelect = {
  id: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type PublicUser = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;

export interface JwtUserPayload {
  userId: string;
}

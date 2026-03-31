import { Prisma } from "@prisma/client";

export const taskSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  dueDate: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TaskSelect;

export type PublicTask = Prisma.TaskGetPayload<{
  select: typeof taskSelect;
}>;

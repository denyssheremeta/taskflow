import { TaskStatus } from "@prisma/client";
import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(200, "Title must be 200 characters or less");

const descriptionSchema = z.preprocess(
  (value) => (value === "" ? null : value),
  z
    .string()
    .trim()
    .max(1000, "Description must be 1000 characters or less")
    .nullable()
    .optional(),
);

const dueDateSchema = z.preprocess(
  (value) => (value === "" ? null : value),
  z.union([z.coerce.date(), z.null()]).optional(),
);

const statusSchema = z.nativeEnum(TaskStatus);

export const taskIdParamsSchema = z.object({
  id: z.uuid("Task id must be a valid UUID"),
});

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  status: statusSchema.optional(),
  dueDate: dueDateSchema,
});

export const updateTaskSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema,
    status: statusSchema.optional(),
    dueDate: dueDateSchema,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

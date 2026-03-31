import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";
import { AppError } from "../utils/app-error";
import { generateToken } from "../utils/jwt";
import { BCRYPT_SALT_ROUNDS } from "../config/constants";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { publicUserSelect } from "../types/auth";

function toPublicUser(user: {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
    },
  });

  const token = generateToken({ userId: user.id });

  return {
    token,
    user: toPublicUser(user),
  };
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken({ userId: user.id });

  return {
    token,
    user: toPublicUser(user),
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: publicUserSelect,
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  return user;
}

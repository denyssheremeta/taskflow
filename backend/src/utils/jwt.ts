import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JWT_EXPIRES_IN } from "../config/constants";
import { AppError } from "./app-error";
import { JwtUserPayload } from "../types/auth";

export function generateToken(payload: JwtUserPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JwtUserPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (typeof decoded === "string" || !("userId" in decoded)) {
      throw new AppError("Invalid token payload", 401);
    }

    return {
      userId: String(decoded.userId),
    };
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
}

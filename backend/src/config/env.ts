import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: Number(getEnv("PORT", "5000")),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  CLIENT_URL: getEnv("CLIENT_URL", "http://localhost:5173"),
};

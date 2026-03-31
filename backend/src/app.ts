import express from "express";
import cors from "cors";
import routes from "./routes";
import { env } from "./config/env";
import { API_PREFIX } from "./config/constants";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(API_PREFIX, routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

import cors from "cors";
import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routes";
import { errorMiddleware } from "./middleware/errorMiddleware";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.get("/health", (_request, response) => {
    response.json({ ok: true, service: "family-graph-api" });
  });
  app.use("/api", apiRouter);
  app.use(errorMiddleware);

  return app;
}

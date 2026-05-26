import { Router } from "express";
import { ok } from "../../lib/response";

export const exitRouter = Router({ mergeParams: true });

exitRouter.post("/", (_request, response) => {
  response.status(501).json(ok({ module: "exit", action: "create-exit-request", status: "skeleton" }));
});

exitRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "exit", action: "list-exit-requests", status: "skeleton" }));
});

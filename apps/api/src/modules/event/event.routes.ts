import { Router } from "express";
import { ok } from "../../lib/response";

export const eventRouter = Router({ mergeParams: true });

eventRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "event", action: "list-family-events", status: "skeleton" }));
});

eventRouter.post("/", (_request, response) => {
  response.status(501).json(ok({ module: "event", action: "create-family-event", status: "skeleton" }));
});

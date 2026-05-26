import { Router } from "express";
import { ok } from "../../lib/response";

export const relationshipRouter = Router({ mergeParams: true });

relationshipRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "relationship", action: "list-core-relationships", status: "skeleton" }));
});

relationshipRouter.post("/", (_request, response) => {
  response.status(501).json(ok({ module: "relationship", action: "request-relationship-change", status: "skeleton" }));
});

relationshipRouter.patch("/:relationshipId", (_request, response) => {
  response.status(501).json(ok({ module: "relationship", action: "update-relationship-status", status: "skeleton" }));
});

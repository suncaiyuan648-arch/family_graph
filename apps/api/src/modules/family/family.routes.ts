import { Router } from "express";
import { ok } from "../../lib/response";

export const familyRouter = Router({ mergeParams: true });

familyRouter.get("/search", (_request, response) => {
  response.status(501).json(ok({ module: "family", action: "safe-family-search", status: "skeleton" }));
});

familyRouter.post("/", (_request, response) => {
  response.status(501).json(ok({ module: "family", action: "create-family-and-leader", status: "skeleton" }));
});

familyRouter.get("/:familyId", (_request, response) => {
  response.status(501).json(ok({ module: "family", action: "family-detail", status: "skeleton" }));
});

familyRouter.get("/:familyId/stats", (_request, response) => {
  response.status(501).json(ok({ module: "family", action: "family-home-stats", status: "skeleton" }));
});

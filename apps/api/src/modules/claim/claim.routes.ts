import { Router } from "express";
import { ok } from "../../lib/response";

export const claimRouter = Router({ mergeParams: true });

claimRouter.get("/candidates", (_request, response) => {
  response.status(501).json(ok({ module: "claim", action: "match-unregistered-candidates", status: "skeleton" }));
});

claimRouter.post("/", (_request, response) => {
  response.status(501).json(ok({ module: "claim", action: "create-claim-request", status: "skeleton" }));
});

claimRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "claim", action: "list-claim-requests", status: "skeleton" }));
});

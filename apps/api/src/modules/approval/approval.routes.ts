import { Router } from "express";
import { ok } from "../../lib/response";

export const approvalRouter = Router({ mergeParams: true });

approvalRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "approval", action: "list-review-items", status: "skeleton" }));
});

approvalRouter.get("/:approvalId", (_request, response) => {
  response.status(501).json(ok({ module: "approval", action: "review-detail", status: "skeleton" }));
});

approvalRouter.post("/:approvalId/approve", (_request, response) => {
  response.status(501).json(ok({ module: "approval", action: "approve-review", status: "skeleton" }));
});

approvalRouter.post("/:approvalId/reject", (_request, response) => {
  response.status(501).json(ok({ module: "approval", action: "reject-review", status: "skeleton" }));
});

approvalRouter.post("/:approvalId/request-more-info", (_request, response) => {
  response.status(501).json(ok({ module: "approval", action: "request-more-info", status: "skeleton" }));
});

import { Router } from "express";
import { ok } from "../../lib/response";

export const memberRouter = Router({ mergeParams: true });

memberRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "member", action: "list-members", status: "skeleton" }));
});

memberRouter.post("/unregistered", (_request, response) => {
  response.status(501).json(ok({ module: "member", action: "create-unregistered-member", status: "skeleton" }));
});

memberRouter.get("/:memberId", (_request, response) => {
  response.status(501).json(ok({ module: "member", action: "member-profile", status: "skeleton" }));
});

memberRouter.patch("/:memberId", (_request, response) => {
  response.status(501).json(ok({ module: "member", action: "request-or-apply-profile-change", status: "skeleton" }));
});

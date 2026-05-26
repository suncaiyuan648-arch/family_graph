import { Router } from "express";
import { ok } from "../../lib/response";

export const placeholderRouter = Router({ mergeParams: true });

placeholderRouter.get("/tree", (_request, response) => {
  response.status(501).json(ok({ module: "tree", action: "family-tree-data", status: "skeleton" }));
});

placeholderRouter.get("/chat/rooms", (_request, response) => {
  response.status(501).json(ok({ module: "chat", action: "reserved-chat-rooms", status: "skeleton" }));
});

placeholderRouter.get("/marketplace", (_request, response) => {
  response.status(501).json(ok({ module: "marketplace", action: "reserved-mutual-help", status: "skeleton" }));
});

placeholderRouter.get("/ai", (_request, response) => {
  response.status(501).json(ok({ module: "ai", action: "reserved-privacy-safe-analysis", status: "skeleton" }));
});

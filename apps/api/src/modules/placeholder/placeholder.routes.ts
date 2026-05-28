import { Router } from "express";
import { ok } from "../../lib/response";
import { buildTree } from "../../data/mockData";

export const placeholderRouter = Router({ mergeParams: true });

placeholderRouter.get("/tree", (_request, response) => {
  response.json(ok(buildTree()));
});

placeholderRouter.get("/chat/rooms", (_request, response) => {
  response.json(ok([{ id: "room-family", name: "家族群聊", reservedFor: "V3_SOCKET_IO" }]));
});

placeholderRouter.get("/marketplace", (_request, response) => {
  response.json(ok([{ id: "help-1", title: "寻找苏州旧宅照片", status: "RESERVED_V3" }]));
});

placeholderRouter.get("/ai", (_request, response) => {
  response.json(ok({ enabled: false, reason: "V1 only exposes privacy-safe analysis placeholders" }));
});

import { Router } from "express";
import { ok } from "../../lib/response";

export const announcementRouter = Router({ mergeParams: true });

announcementRouter.get("/", (_request, response) => {
  response.status(501).json(ok({ module: "announcement", action: "list-announcements", status: "skeleton" }));
});

announcementRouter.post("/", (_request, response) => {
  response.status(501).json(ok({ module: "announcement", action: "create-announcement", status: "skeleton" }));
});

announcementRouter.post("/:announcementId/confirm", (_request, response) => {
  response.status(501).json(ok({ module: "announcement", action: "confirm-announcement", status: "skeleton" }));
});

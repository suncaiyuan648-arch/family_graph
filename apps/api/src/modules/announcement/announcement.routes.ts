import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { announcements } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

export const announcementRouter = Router({ mergeParams: true });

announcementRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request);
  response.json(ok(announcements.filter((item) => item.familyId === familyId)));
});

announcementRouter.post("/", (request, response) => {
  const input = z.object({
    title: z.string().min(1),
    type: z.string().min(1),
    body: z.string().default(""),
    priority: z.enum(["NORMAL", "IMPORTANT", "URGENT"]).default("NORMAL"),
    requiresConfirmation: z.boolean().default(false),
  }).parse(request.body);

  response.status(201).json(created({
    id: "announcement-new",
    familyId: getFamilyId(request),
    ...input,
    publisherName: "林怀古",
    publishedAt: new Date().toISOString(),
    readCount: 0,
    unreadCount: 0,
  }));
});

announcementRouter.post("/:announcementId/confirm", (request, response) => {
  response.json(ok({ id: request.params.announcementId, confirmed: true }));
});

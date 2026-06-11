import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { announcements } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { toAnnouncementDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const announcementRouter = Router({ mergeParams: true });

announcementRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const result = await prisma.announcement.findMany({
        where: { familyId },
        orderBy: { publishedAt: "desc" },
      });
      return response.json(ok(result.map(toAnnouncementDto)));
    } catch {
      // Fall back below.
    }
  }
  return response.json(ok(announcements.filter((item) => item.familyId === familyId)));
});

announcementRouter.post("/", async (request, response) => {
  const input = z.object({
    title: z.string().min(1),
    type: z.string().min(1),
    body: z.string().default(""),
    priority: z.enum(["NORMAL", "IMPORTANT", "URGENT"]).default("NORMAL"),
    requiresConfirmation: z.boolean().default(false),
  }).parse(request.body);

  if (databaseEnabled()) {
    try {
      const result = await prisma.announcement.create({
        data: {
          familyId: getFamilyId(request),
          title: input.title,
          type: input.type,
          body: input.body,
          priority: input.priority,
          requiresConfirmation: input.requiresConfirmation,
          publisherUserId: "user-lin-hg",
          publisherName: "林怀古",
        },
      });
      return response.status(201).json(created(toAnnouncementDto(result)));
    } catch {
      // Fall back below.
    }
  }

  return response.status(201).json(created({
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

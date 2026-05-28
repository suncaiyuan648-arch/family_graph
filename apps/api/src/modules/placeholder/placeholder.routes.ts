import { Router } from "express";
import { ok } from "../../lib/response";
import { buildTree } from "../../data/mockData";
import { databaseEnabled } from "../../lib/database";
import { toTreeDto } from "../../lib/mappers";
import { getFamilyId } from "../../lib/params";
import { prisma } from "../../lib/prisma";

export const placeholderRouter = Router({ mergeParams: true });

placeholderRouter.get("/tree", async (request, response) => {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const [members, relationships] = await Promise.all([
        prisma.familyMember.findMany({
          where: { familyId },
          include: { personProfile: true },
        }),
        prisma.relationship.findMany({ where: { familyId } }),
      ]);
      return response.json(ok(toTreeDto(members.map((member) => member.personProfile), relationships)));
    } catch {
      // Fall back to static tree when the local DB is not running.
    }
  }
  return response.json(ok(buildTree()));
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

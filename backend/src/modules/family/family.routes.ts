import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { announcements, defaultFamilyId, families, familyMembers, people, reviews } from "../../data/mockData";
import { databaseEnabled } from "../../lib/database";
import { toFamilyDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const familyRouter = Router({ mergeParams: true });

familyRouter.get("/my", async (_request, response) => {
  if (databaseEnabled()) {
    try {
      const dbFamilies = await prisma.family.findMany({
        include: { members: { include: { personProfile: true } } },
        orderBy: { createdAt: "asc" },
      });
      return response.json(ok({
        families: dbFamilies.map(toFamilyDto),
        activeFamilyId: dbFamilies[0]?.id ?? defaultFamilyId,
      }));
    } catch {
      // Fall back to seeded static data when the local DB is not running.
    }
  }
  return response.json(ok({ families, activeFamilyId: defaultFamilyId }));
});

familyRouter.get("/search", async (request, response) => {
  const keyword = String(request.query.keyword ?? request.query.name ?? "").trim();
  if (databaseEnabled()) {
    try {
      const results = await prisma.family.findMany({
        where: keyword
          ? {
              OR: [
                { name: { contains: keyword, mode: "insensitive" } },
                { code: { contains: keyword, mode: "insensitive" } },
              ],
            }
          : undefined,
        include: { members: { include: { personProfile: true } } },
      });
      return response.json(ok(results.map((family) => {
        const dto = toFamilyDto(family);
        return {
          id: dto.id,
          name: dto.name,
          codeMasked: dto.code.replace(/\d{3}$/, "***"),
          leaderName: dto.leaderName,
          totalMembers: dto.totalMembers,
          originPlace: dto.originPlace,
          verified: true,
        };
      })));
    } catch {
      // Fall back below.
    }
  }
  const results = families.filter((family) => {
    if (!keyword) return true;
    return family.name.includes(keyword) || family.code.includes(keyword) || family.leaderName.includes(keyword);
  });
  response.json(ok(results.map((family) => ({
    id: family.id,
    name: family.name,
    codeMasked: family.code.replace(/\d{3}$/, "***"),
    leaderName: family.leaderName,
    totalMembers: family.totalMembers,
    originPlace: family.originPlace,
    verified: true,
  }))));
});

familyRouter.post("/", async (request, response) => {
  const input = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    originPlace: z.string().optional(),
  }).parse(request.body);

  if (databaseEnabled()) {
    try {
      const createdFamily = await prisma.family.create({
        data: {
          name: input.name,
          code: `FAM-${Date.now()}`,
          description: input.description,
          originPlace: input.originPlace,
          createdById: "user-lin-hg",
          founderName: "林怀古",
        },
      });
      return response.status(201).json(created(toFamilyDto(createdFamily)));
    } catch {
      // Fall back below.
    }
  }

  return response.status(201).json(created({
    id: "family-new",
    name: input.name,
    code: "LIN-NEW-2026-001",
    description: input.description,
    originPlace: input.originPlace,
    leaderName: "林怀古",
    totalMembers: 1,
  }));
});

familyRouter.post("/:familyId/join", (request, response) => {
  response.status(201).json(created({
    id: "join-request-mock",
    familyId: request.params.familyId,
    status: "PENDING",
    statement: request.body?.statement ?? "申请加入家族。",
  }));
});

familyRouter.get("/:familyId", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const family = await prisma.family.findUnique({
        where: { id: request.params.familyId },
        include: { members: { include: { personProfile: true } } },
      });
      if (!family) return response.status(404).json(ok({ message: "FAMILY_NOT_FOUND" }));
      return response.json(ok(toFamilyDto(family)));
    } catch {
      // Fall back below.
    }
  }
  const family = families.find((item) => item.id === request.params.familyId);
  if (!family) return response.status(404).json(ok({ message: "FAMILY_NOT_FOUND" }));
  return response.json(ok(family));
});

familyRouter.get("/:familyId/stats", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const [members, pendingReviews, unreadAnnouncements] = await Promise.all([
        prisma.familyMember.findMany({
          where: { familyId: request.params.familyId },
          include: { personProfile: true },
        }),
        prisma.reviewItem.count({
          where: { familyId: request.params.familyId, status: "PENDING" },
        }),
        prisma.announcement.count({
          where: { familyId: request.params.familyId, requiresConfirmation: true },
        }),
      ]);
      return response.json(ok({
        totalMembers: members.length,
        registeredMembers: members.filter((member) => member.personProfile.isRegistered).length,
        unregisteredMembers: members.filter((member) => !member.personProfile.isRegistered).length,
        deceasedMembers: members.filter((member) => !member.personProfile.isAlive).length,
        pendingReviews,
        unreadAnnouncements,
      }));
    } catch {
      // Fall back below.
    }
  }
  const familyPeople = people.filter((person) => familyMembers.some((member) => member.familyId === request.params.familyId && member.personProfileId === person.id));
  response.json(ok({
    totalMembers: familyPeople.length,
    registeredMembers: familyPeople.filter((person) => person.isRegistered).length,
    unregisteredMembers: familyPeople.filter((person) => !person.isRegistered).length,
    deceasedMembers: familyPeople.filter((person) => !person.isAlive).length,
    pendingReviews: reviews.filter((review) => review.familyId === request.params.familyId && review.status === "PENDING").length,
    unreadAnnouncements: announcements.reduce((sum, item) => sum + item.unreadCount, 0),
  }));
});

import { Router } from "express";
import type { Request, Response } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { editHistories, familyMembers, people } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { toEditHistoryDto, toPersonDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const memberRouter = Router({ mergeParams: true });

function buildUnregisteredMember(body: unknown) {
  const input = z.object({
    realName: z.string().min(1),
    gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
    isAlive: z.boolean().default(true),
    birthDate: z.string().optional(),
    sourceType: z.string().optional(),
    confidenceLevel: z.enum(["HIGH", "MEDIUM", "LOW", "UNKNOWN"]).default("UNKNOWN"),
  }).parse(body);

  return {
    id: "person-new",
    name: input.realName,
    gender: input.gender,
    birthDate: input.birthDate,
    birthDateType: "UNKNOWN",
    isAlive: input.isAlive,
    isRegistered: false,
    claimStatus: "NONE",
    createdByName: "林怀古",
    lastEditedByName: "林怀古",
    source: input.sourceType ?? "本人提供",
    confidenceLevel: input.confidenceLevel,
    allowClaim: true,
    statusTags: ["未注册"],
  };
}

memberRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request);
  const keyword = String(request.query.keyword ?? "").trim();
  const isRegistered = request.query.isRegistered === undefined ? undefined : request.query.isRegistered === "true";
  const isAlive = request.query.isAlive === undefined ? undefined : request.query.isAlive === "true";

  if (databaseEnabled()) {
    try {
      const result = await prisma.familyMember.findMany({
        where: {
          familyId,
          personProfile: {
            ...(keyword
              ? {
                  OR: [
                    { name: { contains: keyword, mode: "insensitive" } },
                    { formerName: { contains: keyword, mode: "insensitive" } },
                  ],
                }
              : {}),
            ...(isRegistered === undefined ? {} : { isRegistered }),
            ...(isAlive === undefined ? {} : { isAlive }),
          },
        },
        include: { personProfile: true },
        orderBy: { joinedAt: "asc" },
      });
      return response.json(ok(result.map((member) => toPersonDto(member.personProfile))));
    } catch {
      // Fall back below.
    }
  }

  const memberPersonIds = new Set(familyMembers.filter((member) => member.familyId === familyId).map((member) => member.personProfileId));
  const result = people.filter((person) => {
    if (!memberPersonIds.has(person.id)) return false;
    if (keyword && !person.name.includes(keyword) && !(person.formerName ?? "").includes(keyword)) return false;
    if (isRegistered !== undefined && person.isRegistered !== isRegistered) return false;
    if (isAlive !== undefined && person.isAlive !== isAlive) return false;
    return true;
  });

  response.json(ok(result));
});

memberRouter.post("/", async (request, response) => {
  return createUnregisteredMember(request, response);
});

memberRouter.post("/unregistered", async (request, response) => {
  return createUnregisteredMember(request, response);
});

async function createUnregisteredMember(request: Request, response: Response) {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const member = buildUnregisteredMember(request.body);
      const person = await prisma.personProfile.create({
        data: {
          name: member.name,
          gender: member.gender,
          birthDate: member.birthDate ? new Date(member.birthDate) : undefined,
          birthDateType: "UNKNOWN",
          isAlive: member.isAlive,
          isRegistered: false,
          claimStatus: "NONE",
          createdByName: "林怀古",
          lastEditedByName: "林怀古",
          source: member.source,
          confidenceLevel: member.confidenceLevel,
          allowClaim: true,
          familyMembers: {
            create: {
              familyId,
              role: "MEMBER",
              status: "ACTIVE",
              joinedAt: new Date(),
            },
          },
        },
      });
      return response.status(201).json(created(toPersonDto(person)));
    } catch {
      // Fall back below.
    }
  }
  return response.status(201).json(created(buildUnregisteredMember(request.body)));
}

memberRouter.get("/:memberId/edit-history", async (request, response) => {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const histories = await prisma.editHistory.findMany({
        where: { familyId, personProfileId: request.params.memberId },
        orderBy: { createdAt: "desc" },
      });
      return response.json(ok(histories.map(toEditHistoryDto)));
    } catch {
      // Fall back below.
    }
  }
  response.json(ok(editHistories.filter((item) => item.familyId === familyId && item.personId === request.params.memberId)));
});

memberRouter.get("/:memberId", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const person = await prisma.personProfile.findUnique({ where: { id: request.params.memberId } });
      if (!person) return response.status(404).json(ok({ message: "MEMBER_NOT_FOUND" }));
      return response.json(ok(toPersonDto(person)));
    } catch {
      // Fall back below.
    }
  }
  const person = people.find((item) => item.id === request.params.memberId);
  if (!person) return response.status(404).json(ok({ message: "MEMBER_NOT_FOUND" }));
  return response.json(ok(person));
});

memberRouter.patch("/:memberId", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const input = z.object({
        name: z.string().optional(),
        formerName: z.string().optional(),
        gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).optional(),
        isAlive: z.boolean().optional(),
        biography: z.string().optional(),
        currentResidence: z.string().optional(),
        nativePlace: z.string().optional(),
      }).parse(request.body);
      const person = await prisma.personProfile.update({
        where: { id: request.params.memberId },
        data: { ...input, lastEditedByName: "林怀古" },
      });
      return response.json(ok({
        ...toPersonDto(person),
        reviewRequired: person.isRegistered && person.isAlive,
      }));
    } catch {
      // Fall back below.
    }
  }
  const person = people.find((item) => item.id === request.params.memberId);
  if (!person) return response.status(404).json(ok({ message: "MEMBER_NOT_FOUND" }));
  response.json(ok({
    ...person,
    ...request.body,
    lastEditedByName: "林怀古",
    reviewRequired: person.isRegistered && person.isAlive,
  }));
});

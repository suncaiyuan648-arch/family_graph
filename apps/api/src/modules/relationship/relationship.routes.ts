import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { relationships } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { toRelationshipDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const relationshipRouter = Router({ mergeParams: true });

relationshipRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const result = await prisma.relationship.findMany({ where: { familyId } });
      return response.json(ok(result.map(toRelationshipDto)));
    } catch {
      // Fall back below.
    }
  }
  return response.json(ok(relationships.filter((item) => item.familyId === familyId)));
});

relationshipRouter.post("/", async (request, response) => {
  const input = z.object({
    fromPersonId: z.string().min(1),
    toPersonId: z.string().min(1),
    relationType: z.enum(["FATHER", "MOTHER", "SPOUSE", "CHILD"]),
    source: z.string().optional(),
  }).parse(request.body);

  if (databaseEnabled()) {
    try {
      const result = await prisma.relationship.create({
        data: {
          familyId: getFamilyId(request),
          fromPersonId: input.fromPersonId,
          toPersonId: input.toPersonId,
          relationType: input.relationType,
          source: input.source,
          status: "PENDING",
          createdById: "user-lin-hg",
        },
      });
      return response.status(201).json(created({ ...toRelationshipDto(result), reviewRequired: true }));
    } catch {
      // Fall back below.
    }
  }

  return response.status(201).json(created({
    id: "rel-new",
    familyId: getFamilyId(request),
    ...input,
    status: "PENDING",
    reviewRequired: true,
  }));
});

relationshipRouter.patch("/:relationshipId", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const relationship = await prisma.relationship.update({
        where: { id: request.params.relationshipId },
        data: { status: request.body?.status },
      });
      return response.json(ok(toRelationshipDto(relationship)));
    } catch {
      // Fall back below.
    }
  }
  const relationship = relationships.find((item) => item.id === request.params.relationshipId);
  if (!relationship) return response.status(404).json(ok({ message: "RELATIONSHIP_NOT_FOUND" }));
  return response.json(ok({ ...relationship, status: request.body?.status ?? relationship.status }));
});

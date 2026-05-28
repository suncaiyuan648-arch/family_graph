import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { relationships } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

export const relationshipRouter = Router({ mergeParams: true });

relationshipRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request);
  response.json(ok(relationships.filter((item) => item.familyId === familyId)));
});

relationshipRouter.post("/", (request, response) => {
  const input = z.object({
    fromPersonId: z.string().min(1),
    toPersonId: z.string().min(1),
    relationType: z.enum(["FATHER", "MOTHER", "SPOUSE", "CHILD"]),
    source: z.string().optional(),
  }).parse(request.body);

  response.status(201).json(created({
    id: "rel-new",
    familyId: getFamilyId(request),
    ...input,
    status: "PENDING",
    reviewRequired: true,
  }));
});

relationshipRouter.patch("/:relationshipId", (request, response) => {
  const relationship = relationships.find((item) => item.id === request.params.relationshipId);
  if (!relationship) return response.status(404).json(ok({ message: "RELATIONSHIP_NOT_FOUND" }));
  return response.json(ok({ ...relationship, status: request.body?.status ?? relationship.status }));
});

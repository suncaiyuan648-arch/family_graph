import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { announcements, defaultFamilyId, families, familyMembers, people, reviews } from "../../data/mockData";

export const familyRouter = Router({ mergeParams: true });

familyRouter.get("/my", (_request, response) => {
  response.json(ok({ families, activeFamilyId: defaultFamilyId }));
});

familyRouter.get("/search", (request, response) => {
  const keyword = String(request.query.keyword ?? request.query.name ?? "").trim();
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

familyRouter.post("/", (request, response) => {
  const input = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    originPlace: z.string().optional(),
  }).parse(request.body);

  response.status(201).json(created({
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

familyRouter.get("/:familyId", (request, response) => {
  const family = families.find((item) => item.id === request.params.familyId);
  if (!family) return response.status(404).json(ok({ message: "FAMILY_NOT_FOUND" }));
  return response.json(ok(family));
});

familyRouter.get("/:familyId/stats", (request, response) => {
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

import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { editHistories, familyMembers, people } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

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

memberRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request);
  const keyword = String(request.query.keyword ?? "").trim();
  const isRegistered = request.query.isRegistered === undefined ? undefined : request.query.isRegistered === "true";
  const isAlive = request.query.isAlive === undefined ? undefined : request.query.isAlive === "true";

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

memberRouter.post("/", (request, response) => {
  response.status(201).json(created(buildUnregisteredMember(request.body)));
});

memberRouter.post("/unregistered", (request, response) => {
  response.status(201).json(created(buildUnregisteredMember(request.body)));
});

memberRouter.get("/:memberId/edit-history", (request, response) => {
  const familyId = getFamilyId(request);
  response.json(ok(editHistories.filter((item) => item.familyId === familyId && item.personId === request.params.memberId)));
});

memberRouter.get("/:memberId", (request, response) => {
  const person = people.find((item) => item.id === request.params.memberId);
  if (!person) return response.status(404).json(ok({ message: "MEMBER_NOT_FOUND" }));
  return response.json(ok(person));
});

memberRouter.patch("/:memberId", (request, response) => {
  const person = people.find((item) => item.id === request.params.memberId);
  if (!person) return response.status(404).json(ok({ message: "MEMBER_NOT_FOUND" }));
  response.json(ok({
    ...person,
    ...request.body,
    lastEditedByName: "林怀古",
    reviewRequired: person.isRegistered && person.isAlive,
  }));
});

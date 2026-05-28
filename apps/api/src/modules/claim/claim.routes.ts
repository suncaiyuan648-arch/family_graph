import { Router } from "express";
import { created, ok } from "../../lib/response";
import { claimCandidates, defaultFamilyId, reviews } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { toReviewDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const claimRouter = Router({ mergeParams: true });

claimRouter.get("/candidates", async (_request, response) => {
  if (databaseEnabled()) {
    try {
      const candidates = await prisma.personProfile.findMany({
        where: { isRegistered: false, allowClaim: true },
        take: 5,
      });
      return response.json(ok(candidates.map((person, index) => ({
        id: `candidate-${person.id}`,
        personId: person.id,
        name: person.name,
        familyName: "林氏家族",
        generation: person.generation,
        branch: person.branch,
        confidenceScore: index === 0 ? 95 : 65,
        organizerName: person.createdByName,
        matchedFields: ["姓名匹配", "出生日期相近"],
      }))));
    } catch {
      // Fall back below.
    }
  }
  return response.json(ok(claimCandidates));
});

claimRouter.post("/", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const result = await prisma.claimRequest.create({
        data: {
          familyId: getFamilyId(request, defaultFamilyId),
          applicantUserId: "user-lin-hg",
          personProfileId: request.body?.personProfileId,
          statement: request.body?.statement ?? "",
          evidenceUrls: [],
        },
      });
      return response.status(201).json(created({
        id: result.id,
        familyId: result.familyId,
        personProfileId: result.personProfileId,
        status: result.status,
        statement: result.statement ?? "",
      }));
    } catch {
      // Fall back below.
    }
  }

  return response.status(201).json(created({
    id: "claim-request-new",
    familyId: getFamilyId(request, defaultFamilyId),
    personProfileId: request.body?.personProfileId,
    status: "PENDING",
    statement: request.body?.statement ?? "",
  }));
});

claimRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request, defaultFamilyId);
  if (databaseEnabled()) {
    try {
      const result = await prisma.reviewItem.findMany({
        where: { familyId, type: "CLAIM_PROFILE" },
        include: { applicant: true },
        orderBy: { createdAt: "desc" },
      });
      return response.json(ok(result.map(toReviewDto)));
    } catch {
      // Fall back below.
    }
  }
  return response.json(ok(reviews.filter((review) => review.familyId === familyId && review.type === "CLAIM_PROFILE")));
});

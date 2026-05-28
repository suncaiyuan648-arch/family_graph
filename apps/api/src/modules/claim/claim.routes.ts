import { Router } from "express";
import { created, ok } from "../../lib/response";
import { claimCandidates, defaultFamilyId, reviews } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

export const claimRouter = Router({ mergeParams: true });

claimRouter.get("/candidates", (_request, response) => {
  response.json(ok(claimCandidates));
});

claimRouter.post("/", (request, response) => {
  response.status(201).json(created({
    id: "claim-request-new",
    familyId: getFamilyId(request, defaultFamilyId),
    personProfileId: request.body?.personProfileId,
    status: "PENDING",
    statement: request.body?.statement ?? "",
  }));
});

claimRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request, defaultFamilyId);
  response.json(ok(reviews.filter((review) => review.familyId === familyId && review.type === "CLAIM_PROFILE")));
});

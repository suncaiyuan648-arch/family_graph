import { Router } from "express";
import { ok } from "../../lib/response";
import { reviews } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { toReviewDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const approvalRouter = Router({ mergeParams: true });

approvalRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request);
  const status = String(request.query.status ?? "");
  const type = String(request.query.type ?? "");
  if (databaseEnabled()) {
    try {
      const result = await prisma.reviewItem.findMany({
        where: {
          familyId,
          ...(status ? { status: status as never } : {}),
          ...(type ? { type: type as never } : {}),
        },
        include: { applicant: true },
        orderBy: { createdAt: "desc" },
      });
      return response.json(ok(result.map(toReviewDto)));
    } catch {
      // Fall back below.
    }
  }
  const result = reviews.filter((review) => {
    if (review.familyId !== familyId) return false;
    if (status && review.status !== status) return false;
    if (type && review.type !== type) return false;
    return true;
  });
  response.json(ok(result));
});

approvalRouter.get("/:approvalId", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const review = await prisma.reviewItem.findUnique({
        where: { id: request.params.approvalId },
        include: { applicant: true },
      });
      if (!review) return response.status(404).json(ok({ message: "APPROVAL_NOT_FOUND" }));
      return response.json(ok({ ...toReviewDto(review), payload: review.payload ?? { sensitiveFieldsMasked: true, proofFiles: [] } }));
    } catch {
      // Fall back below.
    }
  }
  const review = reviews.find((item) => item.id === request.params.approvalId);
  if (!review) return response.status(404).json(ok({ message: "APPROVAL_NOT_FOUND" }));
  return response.json(ok({ ...review, payload: { sensitiveFieldsMasked: true, proofFiles: [] } }));
});

approvalRouter.post("/:approvalId/approve", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const review = await prisma.reviewItem.update({
        where: { id: request.params.approvalId },
        data: { status: "APPROVED", reviewedAt: new Date() },
        include: { applicant: true },
      });
      return response.json(ok({ ...toReviewDto(review), reviewComment: request.body?.comment ?? "" }));
    } catch {
      // Fall back below.
    }
  }
  response.json(ok({ id: request.params.approvalId, status: "APPROVED", reviewComment: request.body?.comment ?? "" }));
});

approvalRouter.post("/:approvalId/reject", async (request, response) => {
  if (databaseEnabled()) {
    try {
      const review = await prisma.reviewItem.update({
        where: { id: request.params.approvalId },
        data: { status: "REJECTED", reviewedAt: new Date() },
        include: { applicant: true },
      });
      return response.json(ok({ ...toReviewDto(review), reviewComment: request.body?.comment ?? "" }));
    } catch {
      // Fall back below.
    }
  }
  response.json(ok({ id: request.params.approvalId, status: "REJECTED", reviewComment: request.body?.comment ?? "" }));
});

approvalRouter.post("/:approvalId/need-more-proof", (request, response) => {
  response.json(ok({ id: request.params.approvalId, status: "NEEDS_MORE_INFO", reviewComment: request.body?.comment ?? "请补充证明材料" }));
});

approvalRouter.post("/:approvalId/request-more-info", (request, response) => {
  response.json(ok({ id: request.params.approvalId, status: "NEEDS_MORE_INFO", reviewComment: request.body?.comment ?? "请补充证明材料" }));
});

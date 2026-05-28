import { Router } from "express";
import { ok } from "../../lib/response";
import { reviews } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

export const approvalRouter = Router({ mergeParams: true });

approvalRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request);
  const status = String(request.query.status ?? "");
  const type = String(request.query.type ?? "");
  const result = reviews.filter((review) => {
    if (review.familyId !== familyId) return false;
    if (status && review.status !== status) return false;
    if (type && review.type !== type) return false;
    return true;
  });
  response.json(ok(result));
});

approvalRouter.get("/:approvalId", (request, response) => {
  const review = reviews.find((item) => item.id === request.params.approvalId);
  if (!review) return response.status(404).json(ok({ message: "APPROVAL_NOT_FOUND" }));
  return response.json(ok({ ...review, payload: { sensitiveFieldsMasked: true, proofFiles: [] } }));
});

approvalRouter.post("/:approvalId/approve", (request, response) => {
  response.json(ok({ id: request.params.approvalId, status: "APPROVED", reviewComment: request.body?.comment ?? "" }));
});

approvalRouter.post("/:approvalId/reject", (request, response) => {
  response.json(ok({ id: request.params.approvalId, status: "REJECTED", reviewComment: request.body?.comment ?? "" }));
});

approvalRouter.post("/:approvalId/need-more-proof", (request, response) => {
  response.json(ok({ id: request.params.approvalId, status: "NEEDS_MORE_INFO", reviewComment: request.body?.comment ?? "请补充证明材料" }));
});

approvalRouter.post("/:approvalId/request-more-info", (request, response) => {
  response.json(ok({ id: request.params.approvalId, status: "NEEDS_MORE_INFO", reviewComment: request.body?.comment ?? "请补充证明材料" }));
});

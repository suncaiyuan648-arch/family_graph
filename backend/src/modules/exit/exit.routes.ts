import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { exitRequests } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { prisma } from "../../lib/prisma";

export const exitRouter = Router({ mergeParams: true });

exitRouter.post("/", async (request, response) => {
  const input = z.object({
    reason: z.string().min(1),
    keepGenealogyProfile: z.boolean().default(true),
    hideContact: z.boolean().default(true),
    allowNameInGenealogy: z.boolean().default(true),
    note: z.string().optional(),
  }).parse(request.body);

  if (databaseEnabled()) {
    try {
      const result = await prisma.exitRequest.create({
        data: {
          familyId: getFamilyId(request),
          applicantUserId: "user-lin-hg",
          reason: input.reason,
          keepGenealogyProfile: input.keepGenealogyProfile,
          hideContact: input.hideContact,
          allowNameInGenealogy: input.allowNameInGenealogy,
          note: input.note,
        },
      });
      return response.status(201).json(created({
        id: result.id,
        familyId: result.familyId,
        applicantName: "林怀古",
        reason: result.reason,
        keepGenealogyProfile: result.keepGenealogyProfile,
        hideContact: result.hideContact,
        allowNameInGenealogy: result.allowNameInGenealogy,
        status: result.status,
        submittedAt: result.createdAt.toISOString(),
      }));
    } catch {
      // Fall back below.
    }
  }

  return response.status(201).json(created({
    id: "exit-request-new",
    familyId: getFamilyId(request),
    ...input,
    status: "PENDING",
  }));
});

exitRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const result = await prisma.exitRequest.findMany({
        where: { familyId },
        orderBy: { createdAt: "desc" },
      });
      return response.json(ok(result.map((item) => ({
        id: item.id,
        familyId: item.familyId,
        applicantName: item.applicantUserId === "user-lin-hg" ? "林怀古" : "申请人",
        reason: item.reason,
        keepGenealogyProfile: item.keepGenealogyProfile,
        hideContact: item.hideContact,
        allowNameInGenealogy: item.allowNameInGenealogy,
        status: item.status,
        submittedAt: item.createdAt.toISOString(),
      }))));
    } catch {
      // Fall back below.
    }
  }
  return response.json(ok(exitRequests.filter((item) => item.familyId === familyId)));
});

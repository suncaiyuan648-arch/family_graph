import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { exitRequests } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

export const exitRouter = Router({ mergeParams: true });

exitRouter.post("/", (request, response) => {
  const input = z.object({
    reason: z.string().min(1),
    keepGenealogyProfile: z.boolean().default(true),
    hideContact: z.boolean().default(true),
    allowNameInGenealogy: z.boolean().default(true),
    note: z.string().optional(),
  }).parse(request.body);

  response.status(201).json(created({
    id: "exit-request-new",
    familyId: getFamilyId(request),
    ...input,
    status: "PENDING",
  }));
});

exitRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request);
  response.json(ok(exitRequests.filter((item) => item.familyId === familyId)));
});

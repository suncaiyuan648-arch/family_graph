import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { events } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";

export const eventRouter = Router({ mergeParams: true });

eventRouter.get("/", (request, response) => {
  const familyId = getFamilyId(request);
  response.json(ok(events.filter((item) => item.familyId === familyId)));
});

eventRouter.post("/", (request, response) => {
  const input = z.object({
    title: z.string().min(1),
    eventType: z.string().min(1),
    eventDate: z.string().min(1),
    description: z.string().default(""),
    location: z.string().optional(),
    relatedPersonNames: z.array(z.string()).default([]),
    importance: z.enum(["NORMAL", "IMPORTANT"]).default("NORMAL"),
  }).parse(request.body);

  response.status(201).json(created({
    id: "event-new",
    familyId: getFamilyId(request),
    ...input,
    recorderName: "林怀古",
  }));
});

import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../lib/response";
import { events } from "../../data/mockData";
import { getFamilyId } from "../../lib/params";
import { databaseEnabled } from "../../lib/database";
import { toEventDto } from "../../lib/mappers";
import { prisma } from "../../lib/prisma";

export const eventRouter = Router({ mergeParams: true });

eventRouter.get("/", async (request, response) => {
  const familyId = getFamilyId(request);
  if (databaseEnabled()) {
    try {
      const [result, people] = await Promise.all([
        prisma.familyEvent.findMany({ where: { familyId }, orderBy: { eventDate: "asc" } }),
        prisma.personProfile.findMany(),
      ]);
      const peopleById = new Map(people.map((person) => [person.id, person]));
      return response.json(ok(result.map((event) => toEventDto(event, peopleById))));
    } catch {
      // Fall back below.
    }
  }
  return response.json(ok(events.filter((item) => item.familyId === familyId)));
});

eventRouter.post("/", async (request, response) => {
  const input = z.object({
    title: z.string().min(1),
    eventType: z.string().min(1),
    eventDate: z.string().min(1),
    description: z.string().default(""),
    location: z.string().optional(),
    relatedPersonNames: z.array(z.string()).default([]),
    importance: z.enum(["NORMAL", "IMPORTANT"]).default("NORMAL"),
  }).parse(request.body);

  if (databaseEnabled()) {
    try {
      const result = await prisma.familyEvent.create({
        data: {
          familyId: getFamilyId(request),
          title: input.title,
          eventType: input.eventType,
          eventDate: new Date(input.eventDate),
          description: input.description,
          location: input.location,
          relatedPersonIds: [],
          recorderUserId: "user-lin-hg",
          recorderName: "林怀古",
          importance: input.importance,
        },
      });
      return response.status(201).json(created(toEventDto(result)));
    } catch {
      // Fall back below.
    }
  }

  return response.status(201).json(created({
    id: "event-new",
    familyId: getFamilyId(request),
    ...input,
    recorderName: "林怀古",
  }));
});

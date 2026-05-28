import type { Request } from "express";

export function getFamilyId(request: Request, fallback = "family-lin") {
  return (request.params as Record<string, string | undefined>).familyId ?? fallback;
}

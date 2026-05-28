import { Router } from "express";
import { z } from "zod";
import { ok } from "../../lib/response";
import { viewer } from "../../data/mockData";

export const authRouter = Router();

const registerSchema = z.object({
  idType: z.enum(["CHINA_ID", "PASSPORT"]),
  idNumber: z.string().min(4),
  realName: z.string().min(1),
  phone: z.string().min(6),
  phoneCode: z.string().min(4),
  password: z.string().min(6),
});

authRouter.post("/register", (request, response) => {
  const input = registerSchema.parse(request.body);
  response.status(201).json(ok({
    user: { ...viewer, realName: input.realName, documentType: input.idType },
    token: "mock.jwt.token",
    nextStep: "JOIN_OR_CREATE_FAMILY",
  }));
});

authRouter.post("/login-by-id", (_request, response) => {
  response.json(ok({ user: viewer, token: "mock.jwt.token" }));
});

authRouter.post("/send-phone-code", (request, response) => {
  response.json(ok({ phone: request.body?.phone ?? "", codeForDev: "123456", expiresInSeconds: 300 }));
});

authRouter.post("/login-by-phone-code", (_request, response) => {
  response.json(ok({ user: viewer, token: "mock.jwt.token" }));
});

authRouter.post("/bind-phone", (request, response) => {
  response.json(ok({ maskedPhone: "138****1234", phone: request.body?.phone ?? "" }));
});

authRouter.get("/me", (_request, response) => {
  response.json(ok({ user: viewer, activeFamilyId: "family-lin", familyRole: "LEADER" }));
});

authRouter.post("/logout", (_request, response) => {
  response.json(ok({ loggedOut: true }));
});

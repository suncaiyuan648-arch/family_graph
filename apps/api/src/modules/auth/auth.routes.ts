import { Router } from "express";
import { ok } from "../../lib/response";

export const authRouter = Router();

authRouter.post("/register", (_request, response) => {
  response.status(501).json(ok({ module: "auth", action: "register-by-document", status: "skeleton" }));
});

authRouter.post("/login/password", (_request, response) => {
  response.status(501).json(ok({ module: "auth", action: "document-or-phone-password-login", status: "skeleton" }));
});

authRouter.post("/login/sms", (_request, response) => {
  response.status(501).json(ok({ module: "auth", action: "phone-sms-login", status: "skeleton" }));
});

authRouter.get("/me", (_request, response) => {
  response.status(501).json(ok({ module: "auth", action: "current-user", status: "skeleton" }));
});

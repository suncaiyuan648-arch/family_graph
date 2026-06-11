import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: "Invalid request payload",
      issues: error.issues,
    });
    return;
  }

  const status = typeof error.status === "number" ? error.status : 500;
  response.status(status).json({
    success: false,
    message: error.message ?? "Unexpected server error",
  });
};

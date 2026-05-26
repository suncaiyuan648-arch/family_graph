import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  const status = typeof error.status === "number" ? error.status : 500;
  response.status(status).json({
    success: false,
    message: error.message ?? "Unexpected server error",
  });
};

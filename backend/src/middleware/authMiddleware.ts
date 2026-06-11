import type { NextFunction, Request, Response } from "express";

export function requireAuth(_request: Request, response: Response, next: NextFunction) {
  // Skeleton only. Real implementation will verify JWT and attach current user.
  const authorization = _request.headers.authorization;
  if (!authorization) {
    response.status(401).json({ success: false, message: "未登录用户不能访问家族数据" });
    return;
  }
  next();
}

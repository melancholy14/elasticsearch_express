import { Request, Response, NextFunction } from "express";

import HttpException from "../common/http-exception";

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong!";

  response.status(status).json({
    success: false,
    error: message,
  });
};

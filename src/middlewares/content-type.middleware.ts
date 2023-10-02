import { NextFunction, Request, Response } from "express";
import { getServerResponse } from "../utils/helpers";

export function checkContentType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const contentType = request.headers["content-type"];

  if (
    !contentType ||
    (contentType !== "application/json" &&
      !contentType.includes("multipart/form-data"))
  ) {
    return response.status(415).json(
      getServerResponse(false, null, {
        code: 415,
        message: "Invalid content type",
      })
    );
  }

  return next();
}

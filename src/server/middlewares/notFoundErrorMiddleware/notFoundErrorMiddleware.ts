import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export default notFoundError;

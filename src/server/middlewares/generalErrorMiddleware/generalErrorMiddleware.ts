import createDebug from "debug";
import { type Request, type Response, type NextFunction } from "express";
import type CustomError from "../../../CustomError/CustomError.js";
import chalk from "chalk";

const debug = createDebug(
  "happy-tails-api:server:middlewares:errorMiddlewares"
);

const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(`Error: ${chalk.red(error.message)}`);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "General error";

  res.status(statusCode).json({ message });
};

export default generalError;

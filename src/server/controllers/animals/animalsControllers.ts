import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import Animal from "../../../database/models/Animal.js";
import CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug(
  "happy-tails-api:server:controllers:animals:animalsControllers.js"
);

export const getAnimals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await Animal.find().limit(10).exec();
    res.status(200).json({ animals });
  } catch (error) {
    error.message = "Database error connection";
    debug(error);
    next(CustomError);
  }
};

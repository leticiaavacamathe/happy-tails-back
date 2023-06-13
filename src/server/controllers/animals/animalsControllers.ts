import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import Animal from "../../../database/models/Animal.js";
import { type CustomRequest } from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";
import { Types } from "mongoose";

const debug = createDebug(
  "happy-tails-api:server:controllers:animals:animalsControllers.js"
);

export const getAnimals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await Animal.find().sort({ _id: -1 }).limit(10).exec();
    res.status(200).json({ animals });
  } catch (error) {
    error.message = "Database error connection";
    debug(error.message);
    next(error);
  }
};

export const deleteAnimal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idAnimal } = req.params;

    const removedAnimal = await Animal.findByIdAndDelete(idAnimal).exec();

    if (!removedAnimal) {
      const error = new CustomError(404, "Animal not found");

      throw error;
    }

    res.status(200).json({ message: "Animal removed" });
  } catch (error: unknown) {
    next(error);
  }
};

export const addAnimal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;
  try {
    const newAnimal = await Animal.create({
      ...body,
      user: new Types.ObjectId(userId),
    });

    if (!newAnimal) {
      const error = new CustomError(400, "Error Animal not added");

      throw error;
    }

    res.status(201).json({ animal: newAnimal });
  } catch (error: unknown) {
    next(error);
  }
};

export const getAnimal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { idAnimal } = req.params;
  try {
    const animal = await Animal.findById(idAnimal).exec();

    if (!animal) {
      const error = new CustomError(404, "Animal not found");

      throw error;
    }

    return res.status(200).json({ animal });
  } catch (error: unknown) {
    next(error);
  }
};

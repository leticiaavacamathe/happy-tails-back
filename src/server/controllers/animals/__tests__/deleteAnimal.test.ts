import { type NextFunction, type Response } from "express";
import Animal from "../../../../database/models/Animal.js";
import { animalsMocks } from "../../../../mocks/animalMocks.js";
import { type CustomRequest } from "../../../types";
import { deleteAnimal } from "../animalsControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteAnimal controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with a valid animal id", () => {
    test("Then it should call the response method status with code 200", async () => {
      const expectedStatus = 200;

      const req: Partial<CustomRequest> = {
        params: {
          idAnimal: animalsMocks[0]._id.toString(),
        },
      };

      Animal.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(animalsMocks[0]),
      });

      await deleteAnimal(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a request with an invalid animal id", () => {
    test("Then it should call the next function with the message 'Animal not found'", async () => {
      const req: Partial<CustomRequest> = {
        params: { id: "5" },
      };

      const error = new CustomError(404, "Animal not found");

      Animal.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteAnimal(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

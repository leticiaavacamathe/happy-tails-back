import { type NextFunction, type Response } from "express";
import Animal from "../../../database/models/Animal.js";
import { animalsMocks } from "../../../mocks/animalMocks.js";
import { getAnimals } from "./animalsControllers.js";
import { type CustomRequest } from "../../types.js";

describe("Given a getAnimals controller", () => {
  const req = {};
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it recevies a request with a userId and a response", () => {
    Animal.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(animalsMocks),
    });

    test("Then it should call the response status method with '200'", async () => {
      const expectedStatus = 200;

      await getAnimals(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of two plants", async () => {
      const expectedAnimals = animalsMocks;

      await getAnimals(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ animals: expectedAnimals });
    });
  });
});

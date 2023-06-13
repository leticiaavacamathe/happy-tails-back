import { type NextFunction, type Response } from "express";
import Animal from "../../../../database/models/Animal";
import { animalsMocks } from "../../../../mocks/animalMocks";
import { getAnimal } from "../animalsControllers";
import { type CustomRequest } from "../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getAnimal controller", () => {
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with the a valid id animal", () => {
    const req: Partial<CustomRequest> = {
      params: {
        idAnimal: animalsMocks[0]._id.toString(),
      },
    };

    Animal.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(animalsMocks[0]),
    });
    test("Then it should call the response status method with status code 200", async () => {
      const expectedStatus = 200;

      await getAnimal(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("then it should call the response method json with a list of one animal", async () => {
      const excpectedAnimal = animalsMocks[0];

      await getAnimal(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ animal: excpectedAnimal });
    });
  });
});

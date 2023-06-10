import { type NextFunction, type Response } from "express";
import Animal from "../../../../database/models/Animal";
import { newAnimalMock } from "../../../../mocks/animalMocks";
import { type CustomRequest } from "../../../types";
import { addAnimal } from "../animalsControllers";
import CustomError from "../../../../CustomError/CustomError";

describe("Given a addAnimal controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<CustomRequest> = {
    userId: "64708476cb971c1010a20464",
    body: newAnimalMock,
  };

  describe("When it receives a request with a valid animal on the body, a response and a next function", () => {
    test("Then it should call the status response method with status code 201 and a json response with the animal created", async () => {
      const expectedStatus = 201;

      Animal.create = jest.fn().mockResolvedValue(newAnimalMock);

      await addAnimal(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ animal: newAnimalMock });
    });
  });

  describe("When it receives a request with a user id and a new animal but the process fails", () => {
    test("Then it should call the received next function with a custom error 400 with the message 'Error Animal not added'", async () => {
      const expectedStatus = 400;
      const expectedMessage = "Error Animal not added";

      const expectedCustomError = new CustomError(
        expectedStatus,
        expectedMessage
      );

      Animal.create = jest.fn().mockResolvedValue(undefined);

      await addAnimal(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});

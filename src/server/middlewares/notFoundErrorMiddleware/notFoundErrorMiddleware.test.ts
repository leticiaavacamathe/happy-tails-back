import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import notFoundError from "./notFoundErrorMiddleware.js";

describe("Given a notFoundError middleware", () => {
  describe("When it's called", () => {
    test("Then it should call the next function, with a status code 404 and a 'Endpoint not found' message", () => {
      const customError = new CustomError(404, "Endpoint not found");

      type CustomResponse = Pick<Response, "status" | "json">;

      const req = {};

      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

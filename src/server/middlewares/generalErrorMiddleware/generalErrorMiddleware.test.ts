import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import generalError from "./generalErrorMiddleware.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {};

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a generalError middleware", () => {
  describe("When it's called and receives an unknown error", () => {
    test("then it should call the response method status with 500 and a 'General error' message", () => {
      const error = new Error();
      const statusCode = 500;
      const message = "General error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message });
    });

    describe("When it's called with status code 404 and an 'Endpoint not found' message", () => {
      test("then it should call the response method with status code 404 and an 'Endpoint not found' message", () => {
        const error = new CustomError(404, "Endpoint not found");
        const statusCode = 404;
        const message = "Endpoint not found";

        generalError(
          error,
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(statusCode);
        expect(res.json).toHaveBeenCalledWith({ message });
      });
    });
  });
});

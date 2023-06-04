import jwt from "jsonwebtoken";
import { type CustomRequest } from "../../types";
import { type NextFunction, type Request, type Response } from "express";
import { auth } from "./authMiddleware";
import CustomError from "../../../CustomError/CustomError";

describe("Given an auth middleware", () => {
  const token = "gfd7gf788ssdf78ds";

  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer, ${token}`),
  };

  const res = {};

  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      jwt.verify = jest.fn().mockReturnValue("");

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an authorization header with an invalid token and a next function", () => {
    test("Then it should call the received next function with a status code 401 and a message 'Invalid token'", () => {
      const expectedError = new CustomError(401, "Invalid token");

      expectedError.name = "JsonWebTokenError";

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

import jwt from "jsonwebtoken";
import { type CustomRequest } from "../../types";
import { type NextFunction, type Request, type Response } from "express";
import { auth } from "./authMiddleware";

describe("Given an auth middleware", () => {
  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      const token = "gfd7gf788ssdf78ds";

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(`Bearer, ${token}`),
      };

      const res = {};

      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue("");

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User.js";
import {
  type UserCredentialsStructure,
  type UserCredentialsRequest,
  type UserDataStructure,
} from "../../types";
import loginUser from "./userController.js";
import CustomError from "../../../CustomError/CustomError.js";

describe("Given a loginUser controller", () => {
  const userCredentials: UserCredentialsStructure = {
    username: "Jhon",
    password: "jhon",
  };

  const req: Partial<UserCredentialsRequest> = {
    body: userCredentials,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const mockUserCredentials: UserDataStructure = {
    _id: new Types.ObjectId().toString(),
    username: "Jhon",
    password: "jhon",
  };

  const mockToken = "gfdgg7f66d6f6g6g6";

  describe("When it receives a request with a valid username and password", () => {
    test("Then it should call the response method status with status code 200", async () => {
      const expectedStatusCode = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUserCredentials),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(mockToken);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response method json with the token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });

  describe("When it receives a request with an invalid username or password", () => {
    test("Then it should call the next function with a Custom Error with status code 401 and the message 'Wrong credentials'", async () => {
      const error = new CustomError(401, "Wrong credentials");

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

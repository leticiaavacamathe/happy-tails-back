import { type Request, type Response } from "express";
import pingController from "./pingController.js";

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a ping controller", () => {
  describe("When it's called", () => {
    test("Then it should response with a status code 200 and the message 'pong'", () => {
      const statusCode = 200;
      const message = "pong 🏓";

      const req = {};
      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});

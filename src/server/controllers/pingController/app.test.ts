import request from "supertest";
import app from "../..";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200 and a 'pong 🏓' message", async () => {
      const statusCode = 200;
      const message = "pong 🏓";

      const res = await request(app).get("/").expect(statusCode);
      expect(res.body).toStrictEqual({ message });
    });
  });
});

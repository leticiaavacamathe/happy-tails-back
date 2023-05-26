import "../../../loadEnvironment.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../../database/models/User.js";
import {
  type UserCredentialsStructure,
  type UserDatabaseStructure,
} from "../../types.js";
import app from "../../app.js";
import paths from "../../utils/paths.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUser: UserCredentialsStructure = {
  username: "Mary",
  password: "mary",
};

const mockInvalidUser: UserCredentialsStructure = {
  username: "Mar",
  password: "mary",
};

const hashedMockUser: UserCredentialsStructure = {
  username: "Mary",
  password: "$2y$10$m1AiQlcchI32eXrtEl8ej.AiX9p1y/zD0OBEoVfDJoM7nwJf29gi.",
};

describe("Given a POST 'user/login' endpoint", () => {
  describe("When it receives a request with a username 'Mary' and a password 'mary'", () => {
    let newUser: UserDatabaseStructure;

    beforeAll(async () => {
      newUser = await User.create(hashedMockUser);
    });

    test("Then it should respond with a status code 200 and a token", async () => {
      const expectedStatus = 200;

      const res: { body: { token: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockUser)
        .expect(expectedStatus);

      const payload = jwt.verify(res.body.token, process.env.JWT_SECRET!);

      const userId = payload.sub as string;

      expect(userId).toBe(newUser._id.toString());
    });
  });

  describe("When it receives a request with a invalid username 'Mar' and a password 'mary'", () => {
    test("Then it should respond with a status code 401 and a message 'Wrong credentials'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong credentials";

      const res: { body: { message: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockInvalidUser)
        .expect(expectedStatus);

      expect(res.body.message).toBe(expectedMessage);
    });
  });
});

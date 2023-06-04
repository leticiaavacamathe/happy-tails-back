import "../../../loadEnvironment.js";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Animal from "../../../database/models/Animal.js";
import { animalsMocks } from "../../../mocks/animalMocks.js";
import app from "../../app.js";
import paths from "../../utils/paths.js";
import { tokenMock } from "../../../mocks/userMocks.js";

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
  await Animal.deleteMany();
});

describe("Given a GET '/animals' endpoint", () => {
  beforeEach(async () => {
    await Animal.create(animalsMocks);
  });

  describe("When it receives a request with a valid token", () => {
    test("Then it should return a status code 200 and a list of animals", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .get(paths.animals)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.animals).toHaveLength(2);
    });
  });

  describe("When it receives a request with an invalid token", () => {
    test("Then it should return a status code 401 ", async () => {
      const expectedStatusCode = 401;

      await request(app).get(paths.animals).expect(expectedStatusCode);
    });
  });
});

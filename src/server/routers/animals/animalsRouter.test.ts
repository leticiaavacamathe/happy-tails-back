import "../../../loadEnvironment.js";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Animal from "../../../database/models/Animal.js";
import { animalsMocks, newAnimalMock } from "../../../mocks/animalMocks.js";
import app from "../../app.js";
import paths from "../../utils/paths.js";
import { tokenMock } from "../../../mocks/userMocks.js";

let server: MongoMemoryServer;

beforeEach(() => {
  jest.clearAllMocks();
});

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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwODQ3NmNiOTcxYzEwMTBhMjA0NjQiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODY0MjAyODUsImV4cCI6MTY4NzAyNTA4NX0.y9fzD1653TQOGcjCUroE7RcsNt20xvRHejWVKckqzo0";

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

describe("Given a DELETE '/:idAnimal' endpoint", () => {
  beforeEach(async () => {
    await Animal.create(animalsMocks);
  });

  describe("When it receives a request with a valid id", () => {
    test("Then it should return the response method status with code 200 and the response method json with the message 'Animal deleted'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Animal removed";

      const animal = await Animal.find().exec();

      const response = await request(app)
        .delete(`/animals/${animal[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST '/create' endpoint", () => {
  describe("When it receives a request with an animal valid data", () => {
    test("Then it should return the response method status with code 201 and a new animal", async () => {
      const expectedStatus = 201;
      const expectedProperty = "animal";

      const response = await request(app)
        .post("/animals/add")
        .set("Authorization", `Bearer ${token}`)
        .send(newAnimalMock)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });
});

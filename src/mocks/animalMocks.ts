import { Types } from "mongoose";
import { type AnimalStructure } from "../server/types";

export const animalMock: AnimalStructure = {
  _id: new Types.ObjectId(),
  name: "Max",
  image: "http://imageofmax.png",
  type: "dog",
  age: 5,
  city: "Barcelona",
  sex: "Male",
  weight: 15,
  description: "Max is a very nice dog, he likes to play a lot",
  user: new Types.ObjectId("64708476cb971c1010a20464"),
};

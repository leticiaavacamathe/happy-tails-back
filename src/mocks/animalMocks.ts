import { Types } from "mongoose";
import {
  type AnimalStructure,
  type AnimalDatabaseStructure,
} from "../server/types";

export const animalsMocks: AnimalDatabaseStructure[] = [
  {
    _id: new Types.ObjectId(),
    name: "Max",
    image: "https://imageofmax.png",
    type: "dog",
    age: 5,
    city: "Barcelona",
    sex: "Male",
    weight: 15,
    description: "Max is a very nice dog, he likes to play a lot",
    user: new Types.ObjectId("64708476cb971c1010a20464"),
  },
  {
    _id: new Types.ObjectId(),
    name: "Bruno",
    image: "https://imageofbruno.png",
    type: "dog",
    age: 2,
    city: "Barcelona",
    sex: "Male",
    weight: 10,
    description: "Bruno is a very sociable dog, he get well with children",
    user: new Types.ObjectId("64708476cb971c1010a20464"),
  },
];

export const newAnimalMock: AnimalStructure = {
  name: "Sandy",
  image: "https://imageofsandy.png",
  type: "dog",
  age: 7,
  city: "Barcelona",
  sex: "Male",
  weight: 3,
  description: "Sansy is a very sociable dog, he get well with children",
};

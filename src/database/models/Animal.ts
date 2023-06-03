import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const animalSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Animal = model("Animal", animalSchema, "animals");

export default Animal;

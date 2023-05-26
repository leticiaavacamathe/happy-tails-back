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
  breed: {
    type: String,
    required: true,
  },
  vaccinated: {
    type: Boolean,
    required: true,
  },
  dewormed: {
    type: Boolean,
    required: true,
  },
  history: {
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

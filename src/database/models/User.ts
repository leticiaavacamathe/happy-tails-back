import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;

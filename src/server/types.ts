import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentialsStructure {
  username: string;
  password: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentialsStructure
>;

export type UserDataStructure = {
  _id: string;
} & UserCredentialsStructure;

export type UserDatabaseStructure = {
  _id: Types.ObjectId;
} & UserCredentialsStructure;

export interface AnimalDatabaseStructure {
  _id: Types.ObjectId;
  name: string;
  image: string;
  type: string;
  age: number;
  city: string;
  sex: string;
  weight: number;
  description: string;
  user: Types.ObjectId;
}

export interface CustomRequest extends Request {
  userId: string;
  params: {
    idAnimal: string;
  };
  body: AnimalStructure;
}

export interface AnimalStructure {
  name: string;
  image: string;
  type: string;
  age: number;
  city: string;
  sex: string;
  weight: number;
  description: string;
}

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

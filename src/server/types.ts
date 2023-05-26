import { type Request } from "express";

export interface UserCredentialsStructure {
  username: string;
  password: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentialsStructure
>;

export type UserDatabaseStructure = {
  _id: string;
} & UserCredentialsStructure;

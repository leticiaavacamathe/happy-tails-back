import { Joi, validate } from "express-validation";
import { type UserCredentialsStructure } from "../server/types";

const loginSchema = {
  body: Joi.object<UserCredentialsStructure>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const loginValidation = validate(loginSchema, {}, { abortEarly: false });

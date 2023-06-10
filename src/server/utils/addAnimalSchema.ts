import { Joi } from "express-validation";
import { type AnimalStructure } from "../types";

const addAnimalSchema = {
  body: Joi.object<AnimalStructure>({
    name: Joi.string().required(),
    type: Joi.string().required(),
    image: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required(),
    sex: Joi.string().required(),
    weight: Joi.number().required(),
    description: Joi.string().required(),
  }),
};

export default addAnimalSchema;

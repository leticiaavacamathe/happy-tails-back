import { Router } from "express";
import {
  addAnimal,
  deleteAnimal,
  getAnimals,
} from "../../controllers/animals/animalsControllers.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import { validate } from "express-validation";
import addAnimalSchema from "../../utils/addAnimalSchema.js";

const animalsRouter = Router();

animalsRouter.get("/", getAnimals);

animalsRouter.delete("/:idAnimal", auth, deleteAnimal);

animalsRouter.post(
  "/add",
  auth,
  validate(addAnimalSchema, {}, { abortEarly: false }),
  addAnimal
);

export default animalsRouter;

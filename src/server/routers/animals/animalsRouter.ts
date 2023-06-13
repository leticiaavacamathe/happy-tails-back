import { Router } from "express";
import {
  addAnimal,
  deleteAnimal,
  getAnimal,
  getAnimals,
} from "../../controllers/animals/animalsControllers.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import { validate } from "express-validation";
import addAnimalSchema from "../../utils/addAnimalSchema.js";

const animalsRouter = Router();

animalsRouter.get("/", getAnimals);

animalsRouter.get("/:idAnimal", auth, getAnimal);

animalsRouter.delete("/:idAnimal", auth, deleteAnimal);

animalsRouter.post(
  "/add",
  auth,
  validate(addAnimalSchema, {}, { abortEarly: false }),
  addAnimal
);

export default animalsRouter;

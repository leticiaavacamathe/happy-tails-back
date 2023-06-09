import { Router } from "express";
import {
  deleteAnimal,
  getAnimals,
} from "../../controllers/animals/animalsControllers.js";

const animalsRouter = Router();

animalsRouter.get("/", getAnimals);

animalsRouter.delete("/:idAnimal", deleteAnimal);

export default animalsRouter;

import { Router } from "express";
import {
  deleteAnimal,
  getAnimals,
} from "../../controllers/animals/animalsControllers.js";

const animalsRouter = Router();

animalsRouter.get("/", getAnimals);

animalsRouter.delete("/:id", deleteAnimal);

export default animalsRouter;

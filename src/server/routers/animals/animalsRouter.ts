import { Router } from "express";
import { getAnimals } from "../../controllers/animals/animalsControllers.js";

const animalsRouter = Router();

animalsRouter.get("/", getAnimals);

export default animalsRouter;

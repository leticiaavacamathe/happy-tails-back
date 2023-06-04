import "../loadEnvironment.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundErrorMiddleware/notFoundErrorMiddleware.js";
import generalError from "./middlewares/generalErrorMiddleware/generalErrorMiddleware.js";
import pingController from "./controllers/ping/pingController.js";
import paths from "./utils/paths.js";
import userRouter from "./routers/user/userRouter.js";
import animalsRouter from "./routers/animals/animalsRouter.js";
import { auth } from "./middlewares/authMiddleware/authMiddleware.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS!.split(" ");

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.ping, pingController);

app.use(paths.user, userRouter);

app.use(paths.animals, auth, animalsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;

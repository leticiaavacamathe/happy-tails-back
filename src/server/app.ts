import cors from "cors";
import express from "express";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundErrorMiddleware/notFoundErrorMiddleware.js";
import generalError from "./middlewares/generalErrorMiddleware/generalErrorMiddleware.js";
import pingController from "./controllers/ping/pingController.js";
import path from "./paths/paths.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));

app.use(express.json());

app.get(path.pingController, pingController);

app.use(notFoundError);

app.use(generalError);

export default app;

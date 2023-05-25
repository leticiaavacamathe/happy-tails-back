import cors from "cors";
import express from "express";
import morgan from "morgan";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));

app.use(express.json());

export default app;

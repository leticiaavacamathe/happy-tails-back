import express from "express";
import morgan from "morgan";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

export default app;

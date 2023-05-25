import "./loadEnvironment.js";
import createDebug from "debug";
import app from "./server/index.js";
import chalk from "chalk";

export const debug = createDebug("happy-tails-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

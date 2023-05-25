import "./loadEnvironment.js";
import createDebug from "debug";
import app from "./server/index.js";

export const debug = createDebug("happy-tails-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});

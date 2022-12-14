import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

import deserializeUser from "./middleware/deserializeUser";

console.log("bello");
// const port = config.get<number>("port");
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port || process.env.PORT, async () => {
    logger.info(`this app is running at http://localhost:${port}`);

    await connect();

    routes(app);
});

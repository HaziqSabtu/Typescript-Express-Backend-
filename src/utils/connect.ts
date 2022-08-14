import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
    const dbUri = config.get<string>("dbUri");

    return await mongoose
        .connect(dbUri)
        .then(() => {
            logger.info("connected to DB");
        })
        .catch((error) => {
            logger.info("could not connect to DB");
            logger.info(error);
            process.exit(1);
        });
}

export default connect;

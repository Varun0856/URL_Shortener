import app from "./app.js";
import { PORT } from "./config/env.js";
import connectToDB from "./database/mongodb.js";
import logger from "./utils/winstonLogger.js";

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: , ${error}`);
    process.exit(1);
})

const startServer = async() => {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            logger.info(`Server started on port: , ${PORT}`);
        })
    } catch (error) {
        logger.error(`Failed to start server: , ${error.message}`);
        process.exit(1);
    }
}

startServer();

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: , ${error}`);
    process.exit(1);
})
import app from "./app.js";
import { PORT } from "./config/env.js";
import connectToDB from "./database/mongodb.js";

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception', error);
    process.exit(1);
})

const startServer = async() => {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log('Server started on port: ', PORT);
        })
    } catch (error) {
        console.error('Failed to start server: ', error.message);
        process.exit(1);
    }
}

startServer();

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection: ', error);
    process.exit(1);
})
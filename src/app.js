import express, { urlencoded } from "express"
import urlRouter from "./routes/url.route.js";
import mongoose from "mongoose";
import logger from "./utils/winstonLogger.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/url', urlRouter);

app.get('/health', (_, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'; 

    if(dbStatus === 'Disconnected'){
        return res.status(503).json({
            status: 'error',
            database: 'disconnected'
        })
    }

    res.status(200).json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime(),
        database: dbStatus
    });
    
})

export default app;
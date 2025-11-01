import express from "express"
import urlRouter from "./routes/url.route.js";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.middleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware());

app.use('/api/url', urlRouter);

app.get('/health', (_, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';

  if (dbStatus === 'Disconnected') {
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

app.get('/', (_, res) => {
  res.status(200).json({
    name: 'URL_Shortener',
    baseURL: '/api',
    endpoints: {
      shortenURl: 'POST /api/url/shorten',
      redirectToOriginalUrl: 'GET /api/url/:shortId',
      getAnalytics: 'GET /api/url/analytics/:shortId'
    }
  })
})

export default app;

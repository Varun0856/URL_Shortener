import express, { urlencoded } from "express"
import urlRouter from "./routes/url.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/url', urlRouter);

export default app;
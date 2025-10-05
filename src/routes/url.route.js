import { Router } from "express";
import { getAnalytics, redirectToOriginalUrl, shortenUrl } from "../controllers/url.controller.js";
import { limiter } from "../middleware/RateLimiter.js";

const urlRouter = Router();

urlRouter.post('/shorten', limiter ,shortenUrl);

urlRouter.get('/:shortId', redirectToOriginalUrl);

urlRouter.get('/analytics/:shortId', getAnalytics);

export default urlRouter;
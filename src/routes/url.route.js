import { Router } from "express";
import { getAnalytics, redirectToOriginalUrl, shortenUrl } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.post('/shorten', shortenUrl);

urlRouter.get('/:shortId', redirectToOriginalUrl);

urlRouter.get('/analytics/:shortId', getAnalytics);

export default urlRouter;
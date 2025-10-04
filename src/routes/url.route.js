import { Router } from "express";
import { redirectToOriginalUrl, shortenUrl } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.post('/shorten', shortenUrl);

urlRouter.get('/:shortId', redirectToOriginalUrl);

export default urlRouter;
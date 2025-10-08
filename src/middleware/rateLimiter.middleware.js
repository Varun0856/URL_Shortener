import rateLimit from "express-rate-limit";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } from "../config/env";

const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW,
    limit: RATE_LIMIT_MAX,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

export { limiter };
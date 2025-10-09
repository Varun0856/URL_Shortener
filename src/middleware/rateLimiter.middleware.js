import rateLimit from "express-rate-limit";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } from "../config/env.js";

const limiter = rateLimit({
    windowMs: parseInt(RATE_LIMIT_WINDOW) || 60 * 60 * 1000,
    limit: parseInt(RATE_LIMIT_MAX) || 100,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

export { limiter };

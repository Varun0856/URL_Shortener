import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 100,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

export { limiter };
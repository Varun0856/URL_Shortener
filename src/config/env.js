import { config } from "dotenv";
config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

export const { PORT, NODE_ENV, MONGODB_URI, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } = process.env

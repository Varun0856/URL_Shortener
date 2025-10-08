# URL_Shortener API
URL shortener API is an API for the tool that transforms long , complex web addresses into shorter, more manageable links, which then redirect users to the original destination which is built using **Express.js** and **MongoDB**, featuring robust logging, validation, and centralized error handling.

---

## Features
- Shorten long URLs into unique short IDs
- Redirect from short ID to original URL
- Get click analytics per short ID
- **URL expiration** support (auto-invalidates after defined time)
- URL validation before shortening
- Rate limiting on shorten endpoint
- Winston logger for request
- Centralized error and response handling
- AsyncHandler for clean async flow
- MongoDB with Mongoose for persistent storage

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Winston Logger**
- **Express Rate Limit**
- **Custom Utility Handlers**
  - `AsyncHandler.js`
  - `ApiError.js`
  - `ApiResponse.js`

---

## Environment Setup
### Create a `.env.developement/production.local` file:
```env
# Choose environment: development | production
NODE_ENV=development
PORT=your_port
MONGO_URI=your_mongo_connection_string
RATE_LIMIT_WINDOW=window_duration_in_milliseconds
RATE_LIMIT_MAX=max_requests_allowed_in_window
```

### 1. Clone the repository
```bash
git clone https://github.com/Varun0856/URL-Shortener.git
cd URL_Shortener
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
Development:
```bash
npm run dev
```
Production:
```bash
npm start
```

---

## API Endpoints
### Base URL
```bash
/api
```

### URL Routes
| Method   | Endpoint                      | Description                                                               |
| -------- | ----------------------------- | ------------------------------------------------------------------------- |
| **POST** | `/api/url/shorten`            | Shorten a long URL *(rate-limited, validates input, supports expiration)* |
| **GET**  | `/api/url/:shortId`           | Redirects to the original URL if valid and not expired                    |
| **GET**  | `/api/url/analytics/:shortId` | Get analytics (click count, timestamps, etc.) for a specific short URL    |


### Health Check Endpoint
Check system and database status
```bash
GET /health
```

Healthy Response:
```json
{
  "status": "ok",
  "timestamp": "2025-10-08T16:42:00.123Z",
  "uptime": 125.34,
  "database": "Connected"
}
```

Unhealty Response:
```json
{
  "status": "error",
  "database": "disconnected"
}
```

## Utilities Overview

| Utility           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `AsyncHandler.js` | Catches async route errors without try/catch clutter     |
| `ApiError.js`     | Custom error handler for consistent API error formatting |
| `ApiResponse.js`  | Unified success response wrapper                         |
| `logger.js`       | Winston configuration for info, error, and combined logs |


---

## Root Endpoint
```bash
GET /
```

Response:
```json
{
  "name": "URL_Shortener",
  "baseURL": "/api",
  "endpoints": {
    "shortenURl": "POST /api/url/shorten",
    "redirectToOriginalUrl": "GET /api/url/:shortId",
    "getAnalytics": "GET /api/url/analytics/:shortId"
  }
}
```

---

## Author
Varun Kulkarni
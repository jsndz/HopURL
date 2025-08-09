import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import urlRoutes from "./src/routes/urlRoutes.js";

import redirectRoutes from "./src/routes/redirectRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

import {
  shortenLimiter,
  redirectLimiter,
} from "./src/middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "URL Shortener API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api", shortenLimiter, urlRoutes);
app.use("/api/admin", adminRoutes);

app.use("/", redirectLimiter, redirectRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "URL Shortener API",
    version: "1.0.0",
    endpoints: {
      shorten: "POST /api/shorten",
      redirect: "GET /:shortcode",
      admin_list: "GET /api/admin/list",
      admin_stats: "GET /api/admin/stats",
      health: "GET /health",
    },
    documentation: {
      shorten: {
        method: "POST",
        url: "/api/shorten",
        body: { original_url: "https://example.com" },
        response: {
          success: true,
          data: {
            short_code: "abc123",
            short_url: "http://localhost:3000/abc123",
          },
        },
      },
      redirect: {
        method: "GET",
        url: "/:shortcode",
        description: "Redirects to original URL and increments visit count",
      },
      admin: {
        method: "GET",
        url: "/api/admin/list",
        headers: { "X-Admin-Key": "your-admin-key" },
        description: "Lists all shortened URLs (requires admin key)",
      },
    },
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;

import rateLimit from "express-rate-limit";
const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    error: "Too many URL shortening requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: "Too many redirect requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { shortenLimiter, redirectLimiter };

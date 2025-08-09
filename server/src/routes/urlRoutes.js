import express from "express";
import validUrl from "valid-url";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({
        success: false,
        error: "original_url is required",
      });
    }

    if (!validUrl.isUri(original_url)) {
      return res.status(400).json({
        success: false,
        error: "Invalid URL format",
      });
    }

    const existingUrl = await Url.findOne({ original_url });
    if (existingUrl) {
      const short_url = `${process.env.BASE_URL}/${existingUrl.short_code}`;
      return res.status(200).json({
        success: true,
        data: {
          short_code: existingUrl.short_code,
          short_url,
          message: "URL already shortened",
        },
      });
    }

    let short_code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      short_code = nanoid(7);
      const existing = await Url.findOne({ short_code });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({
        success: false,
        error: "Unable to generate unique short code. Please try again.",
      });
    }

    const newUrl = new Url({
      original_url,
      short_code,
    });

    await newUrl.save();

    const short_url = `${process.env.BASE_URL}/${short_code}`;

    res.status(201).json({
      success: true,
      data: {
        short_code,
        short_url,
      },
    });
  } catch (error) {
    console.error("Error in /api/shorten:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;

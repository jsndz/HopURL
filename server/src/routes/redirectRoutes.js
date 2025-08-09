import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

router.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;

    const urlEntry = await Url.findOne({ short_code: shortcode });

    if (!urlEntry) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
      });
    }

    urlEntry.visit_count += 1;
    await urlEntry.save();

    res.redirect(urlEntry.original_url);
  } catch (error) {
    console.error("Error in redirect route:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;

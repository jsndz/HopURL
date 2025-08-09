import express from "express";
import Url from "../models/Url.js";
const router = express.Router();

const verifyAdminKey = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"] || req.query.admin_key;

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Invalid or missing admin key",
    });
  }

  next();
};

router.get("/list", verifyAdminKey, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const urls = await Url.find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .select("original_url short_code visit_count created_at");

    const totalUrls = await Url.countDocuments();

    const formattedUrls = urls.map((url) => ({
      original_url: url.original_url,
      short_code: url.short_code,
      short_url: `${process.env.BASE_URL}/${url.short_code}`,
      visit_count: url.visit_count,
      created_at: url.created_at,
    }));

    res.json({
      success: true,
      data: {
        urls: formattedUrls,
        pagination: {
          current_page: page,
          total_pages: Math.ceil(totalUrls / limit),
          total_urls: totalUrls,
          per_page: limit,
        },
      },
    });
  } catch (error) {
    console.error("Error in /api/admin/list:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

router.get("/stats", verifyAdminKey, async (req, res) => {
  try {
    const totalUrls = await Url.countDocuments();
    const totalVisits = await Url.aggregate([
      { $group: { _id: null, total: { $sum: "$visit_count" } } },
    ]);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const urlsToday = await Url.countDocuments({
      created_at: { $gte: todayStart },
    });

    res.json({
      success: true,
      data: {
        total_urls: totalUrls,
        total_visits: totalVisits.length > 0 ? totalVisits[0].total : 0,
        urls_created_today: urlsToday,
      },
    });
  } catch (error) {
    console.error("Error in /api/admin/stats:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});
export default router;

import mongoose from "mongoose";
const urlSchema = new mongoose.Schema(
  {
    original_url: {
      type: String,
      required: true,
      trim: true,
    },
    short_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    visit_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

urlSchema.index({ short_code: 1 });
urlSchema.index({ created_at: -1 });

export default mongoose.model("Url", urlSchema);

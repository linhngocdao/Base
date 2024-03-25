import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("product", ProductSchema);

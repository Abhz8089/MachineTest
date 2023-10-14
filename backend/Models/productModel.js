import mongoose from "mongoose";

const product = mongoose.Schema(
  {
    parentCategories: {
      type: [String],
      required: true,
    },
    preCategory: {
      type: mongoose.Schema.Types.ObjectId,
    },
    productName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("products", product);
export default products;

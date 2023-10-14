import mongoose from "mongoose";

const parentCat = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
 
  },
  {
    timestamps: true,
  }
);

const pCat = mongoose.model("parentCategory", parentCat);
export default pCat;

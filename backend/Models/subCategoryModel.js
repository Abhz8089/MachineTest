import mongoose from "mongoose";

const subCategory = mongoose.Schema(
  {
    parentCategories: {
      type: [String],
      required: true,
    },
    preCategory: {
     
        type: mongoose.Schema.Types.ObjectId,
     
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const sCat = mongoose.model("subCategory", subCategory);
export default sCat;

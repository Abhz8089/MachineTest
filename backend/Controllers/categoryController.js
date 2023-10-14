import parentCategory from "../Models/parentCategoryModel.js";
import products from "../Models/productModel.js";
import sCat from "../Models/subCategoryModel.js";

const addCategory = async (req, res) => {
  try {
    const { parentCat, cat, prevParent } = req.body;

    let category = cat.toUpperCase();
    if (!parentCat[0]) {
      const isAvail = await parentCategory.find({ categoryName: category });
      if (isAvail.length) {
        return res.json({ error: "This category name is already create" });
      }
      const details = await parentCategory.create({
        categoryName: category,
      });
      if (!details) {
        return res.json({ error: "Error creating category" });
      }
      return res.json({ success: "category created" });
    } else {
      const result = await sCat.create({
        parentCategories: parentCat,
        preCategory: prevParent.id,
        categoryName: category,
      });
      if (!result) {
        return res.json({ error: "Error creating category" });
      }
      return res.json({ sucess: "Categor created" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "server please re load the page" });
  }
};

const getCat = async (req, res) => {
  try {
    const result = await parentCategory.find({}, { categoryName: 1 });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json({ error: "server please re load the page" });
  }
};

const getSubCat = async (req, res) => {
  try {
    let id = req.query.Id;
    const result = await sCat.find({ preCategory: id }, { categoryName: 1 });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json({ error: "server please re load the page" });
  }
};

const getCategory = async (req, res) => {
  try {
    const result = await parentCategory.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "categoryName",
          foreignField: "parentCategories",
          as: "products",
        },
      },
      {
        $project: {
          categoryName: 1,
          numberOfProducts: { $size: "$products" },
        },
      },
    ]);

    const allProducts = await products.find({}, { productName: 1 });

    return res.json({ result, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, please reload the page" });
  }
};

const subcategories = async (req, res) => {
  try {
    const catId = req.query.lastCat;
    const order = req.query.e;
    const newArray = order.map((item) => item.name);

    let allProducts = await products.find(
      {
        parentCategories: { $all: newArray },
      },
      { productName: 1 }
    );

    let result = await sCat.find(
      { preCategory: catId },
      { categoryName: 1, parentCategories: 1 }
    );
    let details = await products.find(
      {},
      { productName: 1, parentCategories: 1 }
    );
    const resultWithCounts = result.map((category) => {
      const totalNumberOfProducts = details.filter(
        (product) =>
          product.parentCategories.includes(category.categoryName) &&
          category.parentCategories.every((parentCategory) =>
            product.parentCategories.includes(parentCategory)
          )
      ).length;

      return {
        _id: category._id,
        categoryName: category.categoryName,
        numberOfProducts: totalNumberOfProducts.toString(),
      };
    });
    return res.json({ resultWithCounts, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, please reload the page" });
  }
};

export { addCategory, getCat, getSubCat, getCategory, subcategories };

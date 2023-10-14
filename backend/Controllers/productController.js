import productModel from "../Models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { parentCat, product, preCat } = req.body;
    let upperProduct = product.toUpperCase();
    const result = await productModel.find({
      preCategory: preCat.id,
      product: upperProduct,
    });

    if (result.length) {
      return res.json({ error: "This product is already added" });
    } else {
      const details = await productModel.create({
        parentCategories: parentCat,
        preCategory: preCat.id,
        productName: upperProduct,
      });
      if (!details) {
        return res.json({ error: "Error adding product please try again" });
      } else {
        return res.json({ success: "Product successfully added" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Server please re load the page" });
  }
};

export { addProduct };

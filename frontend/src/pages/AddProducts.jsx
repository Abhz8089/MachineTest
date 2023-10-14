import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaChevronDown, FaTrash } from "react-icons/fa";
import Style from "./Styles/AddProducts.module.css";

const AddProducts = () => {
  const [optionCat, setOptionCat] = useState([]);
  const [parentCat, setParentCat] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [product, setProduct] = useState("");
  const [mainCat, setMainCat] = useState([]);
  const [displaySelection, setDisplaySelection] = useState([]);

  useEffect(() => {
    if (!optionCat.length) {
      setInputVisible(true);
    } else {
      setInputVisible(false);
    }
  }, [optionCat, parentCat]);
  useEffect(() => {
    async function getCat() {
      try {
        const { data } = await axios.get("/getCat");
        if (data.error) {
          toast.error(data.error);
        } else {
          setOptionCat(data);
          setMainCat(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCat();
  }, []);

  const handleCategory = async (event) => {
    const selectedCategory = event.target.value;
    const selectedCategoryObject = optionCat.find(
      (cat) => cat.categoryName === selectedCategory
    );

    if (selectedCategoryObject) {
      setDisplaySelection((prevDisplaySelection) => [
        ...prevDisplaySelection,
        {
          id: selectedCategoryObject._id,
          categoryName: selectedCategoryObject.categoryName,
        },
      ]);
    }

    setParentCat((prevParentCat) => [...prevParentCat, selectedCategory]);
    try {
      let Id = selectedCategoryObject._id;
      const { data } = await axios.get("/getSubCat", { params: { Id } });
      setOptionCat(data);
    } catch (error) {
      console.log(error);
      toast.error("Server error please reload the page");
    }
  };
  const handleProduct = (e) => {
    setProduct(e.target.value);
  };
  const createProduct = async () => {
    try {
      if (!product) {
        toast.error("Enter product name");
      } else {
        let preCat = displaySelection[displaySelection.length - 1];
        const { data } = await axios.post("/addProduct", {
          parentCat,
          product,
          preCat,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Product successfully added");
          setOptionCat(mainCat);
          setParentCat([]);
          setDisplaySelection([]);
          setProduct("");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error please re load the page");
    }
  };
  const handleDeleteCategory = () => {
    setOptionCat(mainCat);
    setParentCat([]);
    setDisplaySelection([]);
  };

  return (
    <div className={Style.body}>
      <h1>Add Products</h1>
      <label htmlFor="product">Choose category</label>
      <select onChange={handleCategory} value={parentCat[parentCat.length - 1]}>
        {optionCat.length ? (
          <option value="">Select Category</option>
        ) : (
          <option value="">-----</option>
        )}

        {optionCat.map((product, index) => (
          <option key={index} value={product.categoryName}>
            {product.categoryName}
          </option>
        ))}
      </select>

      {displaySelection.length > 0 ? (
        <>
          <ul>
            {displaySelection.map((selected, index) => (
              <>
                <li key={index}>{`${selected.categoryName}`}</li>
                <FaChevronDown />
              </>
            ))}
          </ul>
          <FaTrash
            className="delete-icon"
            onClick={() => handleDeleteCategory()}
          />
        </>
      ) : (
        <i style={{ marginBottom: "2rem" }}>No categories selected</i>
      )}
      <label htmlFor="category">Create Product:</label>
      <input
        type="text"
        disabled={!inputVisible}
        onChange={handleProduct}
        value={product}
      />
      <button onClick={() => createProduct()}>Create</button>
    </div>
  );
};

export default AddProducts;

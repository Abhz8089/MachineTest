// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Select from "react-select";

// const ViewProducts = () => {
//   const [optionCat, setOptionCat] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [mainCat, setMainCat] = useState([]);

//   useEffect(() => {
//     async function getCat() {
//       try {
//         const { data } = await axios.get("/getCategory");
//         if (data.error) {
//           toast.error(data.error);
//         } else {
//           setOptionCat(data.result);
//           setMainCat(data.result);
//           setProducts(data.allProducts);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     getCat();
//   }, []);

//   const handleOptions = async (e) => {
//     setSelectedOptions(e);
//     try {
//       if (e.length) {
//         let lastCat = e[e.length - 1].value;
//         const { data } = await axios.get("/subcategories", {
//           params: { lastCat, e },
//         });
//         if (data.error) {
//           toast.error(data.error);
//         } else {
//           setOptionCat(data.resultWithCounts);
//           setProducts(data.allProducts);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Server error please reload the page");
//     }
//   };

//   return (
//     <>
//       <Select
//         isMulti
//         name="colors"
//         onChange={handleOptions}
//         options={optionCat.map((option) => ({
//           value: `${option._id}`,
//           label: `${option.categoryName} (${option.numberOfProducts})`,
//           name: option.categoryName,
//         }))}
//         value={selectedOptions}
//         isClearable={false}
//         isOptionSelected={false}
//         className="basic-multi-select"
//         classNamePrefix="select"
//       />
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//           justifyContent: "center",
//         }}
//       >
//         {products
//           ? products.map((product, key) => (
//               <p key={key}>{product.productName}</p>
//             ))
//           : null}
//       </div>
//     </>
//   );
// };

// export default ViewProducts;


import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

const ViewProducts = () => {
  const [optionCat, setOptionCat] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 

  useEffect(() => {
    async function getCat() {
      try {
        const { data } = await axios.get("/getCategory");
        if (data.error) {
          toast.error(data.error);
        } else {
          setOptionCat(data.result);
          setProducts(data.allProducts);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCat();
  }, []);

  const handleOptions = async (e) => {
    setSelectedOptions(e);
    try {
      if (e.length) {
        let lastCat = e[e.length - 1].value;
        const { data } = await axios.get("/subcategories", {
          params: { lastCat, e },
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          setOptionCat(data.resultWithCounts);
          setProducts(data.allProducts);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error, please reload the page");
    }
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Select
        isMulti
        name="colors"
        onChange={handleOptions}
        options={optionCat.map((option) => ({
          value: `${option._id}`,
          label: `${option.categoryName} (${option.numberOfProducts})`,
          name: option.categoryName,
        }))}
        value={selectedOptions}
        isClearable={false}
        isOptionSelected={false}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {currentProducts
          ? currentProducts.map((product, key) => (
              <>
                <div
                  style={{
                    backgroundColor: "#8DE6DF",
                    marginTop: "5px",
                    minWidth: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "4px",
                  }}
                >
                  <p key={key}>{product.productName}</p>
                </div>
              </>
            ))
          : null}
        {/* Pagination */}
        <nav>
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  style={{
                    borderRadius: "7px",
                    border: "none",
                    background: "#70CFC9",
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ViewProducts;

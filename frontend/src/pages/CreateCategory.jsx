import React,{useEffect, useState} from 'react'
import Style from './Styles/CreateCategory.module.css';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { FaChevronDown,FaTrash } from "react-icons/fa";
const CreateCategory = () => {
    const [parentCat, setParentCat] = useState([]);
    const [cat, setCat] = useState('');
    const [optionCat, setOptionCat] = useState([]);
    const [mainCat, setMainCat] = useState([])
    const [displaySelection, setDisplaySelection] = useState([])
   
    useEffect(() => {
    async  function getCat(){

        try {
          const { data } = await axios.get("/getCat");
          if(data.error){
            toast.error(data.error)
          }else{
            setOptionCat(data)
            setMainCat(data)
          }
        } catch (error) {
          console.log(error)
        }
      }
    getCat()
      
    }, [])
    
    
    const handleParentCat = async(event) => {
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
        let Id =selectedCategoryObject._id
        const {data} = await axios.get('/getSubCat',{params:{Id}})
       setOptionCat(data)
      } catch (error) {
        console.log(error)
        toast.error('Server error please reload the page')
      }
    };


    const handleCat = (event) => {
        setCat(event.target.value)
    }

    const createCat= async ()=>{
        
        try {
            if (!cat) {
              toast.error("category name is required");
            }else{
                let prevParent=displaySelection[displaySelection.length-1]
                const { data } = await axios.post("/addCat", {
                  parentCat,
                  cat,
                  prevParent
                  
                });
                if (data.error) {
                  toast.error(data.error);
                } else {
                  setParentCat([])
                  setCat('')
                  setDisplaySelection([])
                  setOptionCat(mainCat)
                  toast.success("success");
                }
            }
           
            
        } catch (error) {
            console.log(error)
            toast.error("Server error please re login")
        }
    }

    const handleDeleteCategory =()=>{
       setDisplaySelection([])
       setParentCat([])
       setOptionCat(mainCat)

    }


  return (
    <div className={Style.body}>
      <h1>Add Categories</h1>
      <label htmlFor="product">
        Select Parent Category (if none, select "None")
      </label>
      <select
        onChange={handleParentCat}
        value={parentCat[parentCat.length - 1]}
      >
        <option value="">None</option>
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
      <label htmlFor="category">Create Category:</label>
      <input type="text" onChange={handleCat} value={cat} />
      <button onClick={() => createCat()}>Submit</button>
    </div>
  );
}

export default CreateCategory
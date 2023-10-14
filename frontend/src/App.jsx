import React from "react";
import axios from "axios";

import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbars from "./components/Navbar";
import AddProducts from "./pages/AddProducts";
import CreateCategory from "./pages/CreateCategory";
import ViewProducts from "./pages/ViewProducts";


axios.defaults.baseURL = "http://localhost:3001" ;
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <Router>
      <>
        <Toaster
          position="bottom-right"
          toastOptions={{ duration: 4000 }}
        ></Toaster>
        <Navbars />
        <Routes>
          <Route path="/" element={<ViewProducts />} />
          <Route path="/addP" element={<AddProducts />} />
          <Route path="/addC" element={<CreateCategory />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Style from './styles/Navbar.module.css';
const Navbar = () => {
    const Navigate = useNavigate()
  return (
    <div className={Style.body}>
        <i onClick={()=>Navigate('/addC')}>Add categories</i>
        <i onClick={()=>Navigate('/addP')}>Add Products</i>
        <i onClick={()=>Navigate('/')}>View Products</i>
    </div>
  )
}

export default Navbar
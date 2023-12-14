import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'

const UpdateProduct = () => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [updateErr, setUpdateErr] = useState(false);

  const productID = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async() => {
    let resp = await fetch(`http://localhost:8080/api/v1/getaproduct/${productID.id}`)
    let response = await resp.json();
    if(response){
      setProductName(response.productName);
      setPrice(response.price);
      setCategory(response.category);
      setCompany(response.company);
    }else{
      toast.error("Unable to fetch Product Details...")
    }
  }

  const auth = localStorage.getItem("user");
  const Navigate = useNavigate();

  const clearStorage = () => {
    localStorage.clear();
    Navigate("/signup");
  };

  const updateProduct = async() => {
    if(!productName || !price || !category || !company){
      setUpdateErr(true);
      toast.error("Update Product Failed.")
    }else{
      setUpdateErr(false);
      let user = await fetch(`http://localhost:8080/api/v1/update/${productID.id}`, {
      method : 'Put',
      body : JSON.stringify({productName, price, category, company}),
      headers : {
        "Content-Type" : "Application/json"
      }
    })

    let updatedUser = await user.json();
    console.log(updatedUser);
    if(updatedUser){
      Navigate('/products')
    }
    }
  }

  return (
    <div>
      <div className="container">
        <img
          src={require("../Image/shop-cart.jpg")}
          alt="logo"
          className="logo-img"
        />
        {auth ? (
          <ul className="navbar">
            <li>
              <Link to="/">
                <button>Home</button>
              </Link>
            </li>
            <li>
              <Link to="/products">
                <button>Products</button>
              </Link>
            </li>
            <li>
              <Link to="/addproducts">
                <button>Add Products</button>
              </Link>
            </li>
            <li>
              <Link to="/update/:id">
                <button>Update Product</button>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <button>Profile</button>
              </Link>
            </li>
            <li>
              <Link onClick={clearStorage} to="/signup">
                <button>Logout {JSON.parse(auth).name}</button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar nav-right">
            <li>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="update">
        <h1>Update Product</h1>
        <div className="update-data">
          <input 
            type="text"
            placeholder="Update Product Name..." 
            value = {productName}
            onChange={(e) => setProductName(e.target.value)}/>
            <br />
            {updateErr && !productName && <span className="error-msg">* Update Name Must be Present *</span>}
            <br />
          <input 
            type="text"
            placeholder="Update Price of Product..."
            value = {price}
            onChange = {(e) => setPrice(e.target.value) } />
            <br />
            {updateErr && !price && <span className="error-msg">* Price must be present *</span>}
            <br />
          <input 
            type="text" 
            placeholder="Update Category of Product..."
            value = {category}
            onChange = {(e) => setCategory(e.target.value)}/>
            <br />
            {updateErr && !category && <span className="error-msg">* Category must be present *</span>}
            <br />
          <input 
            type="text" 
            placeholder="Update Company of Product..."
            value = {company}
            onChange = {(e) => setCompany(e.target.value)}/>
            <br />
            {updateErr && !company && <span className="error-msg">* Comapny Name must be present *</span>}
        </div>
        <button onClick = {updateProduct}>Update</button>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <h3>E Dashboard</h3>
        </div>
      </footer>
    </div>
  );
};

export default UpdateProduct;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [category, setcategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);

  const collectProductData = async() => {
    if(!productName || !price || !category || !company){
      setError(true);
      toast.error("Please Provide the Product Details...")
    }else{
      let resp = await fetch('http://localhost:8080/api/v1/addproduct', {
      method : 'post',
      body : JSON.stringify({productName, price, category, company}),
      headers : {
        "Content-type" : "application/json"
      }
    })

      let response = await resp.json();
      console.log(response);
      if(response.status === 'Success'){
        toast.success('Product Details added successfully...')
        Navigate('/products');
      }else{
        toast.error("Error in adding Product details...")
      }
    }
  };

  const auth = localStorage.getItem("user");
  const Navigate = useNavigate();

  const clearStorage = () => {
    localStorage.clear();
    Navigate("/signup");
  };

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
      <div className="product">
        <h1>Add Product</h1>
        <div className="product-data">
          <input
            type="text"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
            <br />
          {error && !productName && <span className="error-msg"> * Product Name Should Be present... * </span>}
          <br />
          <input
            type="text"
            placeholder="Enter Price of Product"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          {error && !price && <span className="error-msg"> * Please put the price of product... * </span>}
          <br />
          <input
            type="text"
            placeholder="Category of the Product"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
          <br />
          {error && !category &&  <span className="error-msg"> * Please mention the category of Product * </span>}
          <br />
          <input
            type="text"
            placeholder="Enter Comapny Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <br />
          {error && !company && <span className="error-msg"> * Please mention the company name of Product...* </span>}
        </div>
        <button onClick={collectProductData}>Add Product</button>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <h3>E Dashboard</h3>
        </div>
      </footer>
    </div>
  );
};

export default AddProduct;

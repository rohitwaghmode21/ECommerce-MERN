import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Products = () => {
  const auth = localStorage.getItem("user");
  const Navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchErr, setSearchErr] = useState(false);

  useEffect(() => {
    getProducts();
  }, [])
  
  const getProducts = async() => {
    const Data = await fetch('http://localhost:8080/api/v1/getproducts')
    const response = await Data.json();
    setProducts(response);
  }

  const clearStorage = () => {
    localStorage.clear();
    Navigate("/signup");
  };

  const deleteProduct = async(index) => {
    console.log(index);
    let result = await fetch(`http://localhost:8080/api/v1/delete/${index}`, {
      method : 'Delete'
    })
    let response = await result.json();
    console.log(response);
    if(response){
      toast.success('Deleted...');
      getProducts();
    }else{
      toast.error('Unable to Delete Product')
    }
  }

  const updateProduct = async(id) => {
    Navigate(`/update/${id}`)

  }

  const searchProduct = async(e) => {
    e.preventDefault();
    if(search){
      if(!search){
        setSearchErr(true);
      }else{
        setSearchErr(false);
        const searchItem = await fetch(`http://localhost:8080/api/v1/search/${search}`);
        const afterSearch = await searchItem.json();
        if(afterSearch){
          setProducts(afterSearch);
          setSearch("");
          if(afterSearch.length > 0){
            toast.success("Congratulations...! Search Done")
          }
        }else{
          toast.error("Sorry!! Does not exist...")
        }
      }
    }else{
      getProducts();
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
      <div className = "product-list">
        <h1>Product List</h1>
        <div className = "search-product">
          <input 
            type="text" 
            placeholder ="Search Product..."
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}/>
            <button onClick={searchProduct}>Search</button>
            <br />
            {searchErr ? <span className="search-err">* Please Enter a Valid Search Input *</span> : ""}
            <br />
        </div>
        <div className="product-list-table-header">
          <table>
            <tr>
              <th>S.R. No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Delete Product</th>
              <th>Update Product</th>
            </tr>
                {
                  products.length > 0 ? products.map((ele, index) => {
                                          return(
                                            <tr key = {ele._id}>
                                              <td>{index + 1}</td>
                                              <td>{ele.productName}</td>
                                              <td>{ele.price}</td>
                                              <td>{ele.category}</td>
                                              <td>{ele.company}</td>
                                              <td className="delete-btn">{<button onClick = {() => deleteProduct(ele._id)} >Delete</button>}</td>
                                              <td className="update-btn">{<button onClick = {() => updateProduct(ele._id)} >Update</button>}</td>
                                            </tr>
                                            )
                                          })
                                      : <tr>
                                          <td className="no-result" colSpan="7">
                                            <h3>* No Result Found *</h3>
                                          </td>
                                        </tr> 
                }
          </table>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <h3>E Dashboard</h3>
        </div>
      </footer>
    </div>
  );
};

export default Products;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
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
      <div>Profile</div>
      <footer className="footer">
        <div className="footer-content">
          <h3>E Dashboard</h3>
        </div>
      </footer>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await fetch("http://localhost:8080/api/v1/login", {
      method: "post",
      body: JSON.stringify({email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await result.json();
    console.log(resp);
    if (resp.email) {
      localStorage.setItem("user", JSON.stringify({email, password }));
      Navigate("/");
      toast.success("Logged in Successfully...");
    } else {
      toast.error("Given crenditals does not exist");
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
      <div className="login-data">
        <h1>Login Component</h1>
        <div className="login-page">
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          <button type="button" onClick={handleLogin}>Login</button>
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

export default Login;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const Navigate = useNavigate();

  const auth = localStorage.getItem("user");

  useEffect(() => {
    if (auth) {
      Navigate("/");
    }
  }, []);

  const clearStorage = () => {
    localStorage.clear();
    Navigate("/signup");
  };

  const collectData = async () => {
    const result = await fetch("http://localhost:8080/api/v1/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await result.json();
    console.log(response);
    if (response.status === "failed") {
      toast.error("not able to add the data");
      Navigate('/');
    } else {
      localStorage.setItem("user", JSON.stringify({ name, email, password}));
      Navigate("/profile");
      toast.success("Data added successfully");
    }
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
      <div className="register">
        <h3>Register Your Account</h3>
        <div className="register-data">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          <button onClick={collectData}>Register</button>
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

export default SignUp;

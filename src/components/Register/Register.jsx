import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // handling input data
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // checking for error validation
  const validateError = () => {
    const newError = {};
    if (!formData.name.trim()) {
      newError.name = "Name is required";
    } else if (!(formData.name.length > 2)) {
      newError.name = "Name should be at least 3 characters long";
    }
    if (!formData.email.trim()) {
      newError.email = "Please provide your email address";
    } else if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email =
        "Invalid email format. Please use a valid format like example@domain.com";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required";
    } else if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters long";
    } else if (!/[a-z]/.test(formData.password)) {
      newError.password = "Password must contain atleast one lowercase letter";
    } else if (!/[A-Z]/.test(formData.password)) {
      newError.password = "Password must contain atleast one uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newError.password = "Password must contain atleast one special character";
    }
    if (!formData.phone.trim()) {
      newError.phone = "Mobile Number is required";
    } else if (formData.phone.length !== 10) {
      newError.phone = "Mobile number must be exactly 10 digits long";
    } else if (/[^0-9]/.test(formData.phone)) {
      newError.phone = "Mobile number should contain only numeric digit";
    }

    if (Object.keys(newError).length > 0) {
      toast.error(Object.values(newError)[0]);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateError()) {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Registration successful");
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
          });
          navigate("/");
        } else {
          toast.error(data.message || "Registration failed,  Try again!");
        }
      } catch (error) {
        toast.error("Network error. Please try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="signUp-container">
      <h1>Sign Up</h1>
      <form className="signUp-form" noValidate>
        <div className="signUp-container--form">
          <div className="signup-input--wrapper">
            <label className="signUp-text">Name</label>
            <input
              className="signUp-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="Eg.John A"
            />
          </div>
          <div className="signup-input--wrapper">
            <label className="signUp-text">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="signUp-input"
              onChange={inputHandler}
            />
          </div>
          <div className="signup-input--wrapper">
            <label className="signUp-text">Password</label>
            <input
              className="signUp-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
            />
          </div>
          <div className="signup-input--wrapper">
            <label className="signUp-text">Phone</label>
            <input
              className="signUp-input"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={inputHandler}
            />
          </div>
          {loading? (<button className="signUp-btn loading-state" onClick={handleSubmit} disabled>
            Loading...
          </button>):(     <button className="signUp-btn" onClick={handleSubmit}>
            Register
          </button>)}
     
        </div>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
};

export default Register;

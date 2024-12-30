import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import toast from "react-hot-toast";
import backArrowLogo from "../../assets/arrow_back.png";
import orangeLogo from "../../assets/login-orange-logo.png";
import ellipseFirst from "../../assets/login-Ellipse 1.png";
import ellipseSecond from "../../assets/login-Ellipse 2.png";
import googleIcon from "../../assets/Google Icon.png";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      newError.name = "Username is required";
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
          localStorage.setItem("token", data.token);
          localStorage.setItem("username",data.username)
          localStorage.setItem("userId", data.userid)
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate(`/dashboard/${localStorage.getItem("userId", data.userId)}`);
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

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <div className="signup-container">
      <button className="signup-back--btn" onClick={handleBackBtn}>
        <img src={backArrowLogo} alt="arrow back logo" />
      </button>

      <img src={orangeLogo} alt="orange color logo" className="orange-logo" />
      <img src={ellipseFirst} alt="half circle" className="ellipse-first" />
      <img src={ellipseSecond} alt="half second" className="ellipse-second" />

      <form className="signup-form" noValidate>
        <div className="signup-form--container">
          <div className="signup-input--wrapper">
            <label className="signup-text--label">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="signup-input"
              onChange={inputHandler}
              placeholder="Enter a username"
            />
          </div>
          <div className="signup-input--wrapper">
            <label className="signup-text--label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="signup-input"
              onChange={inputHandler}
              placeholder="Enter your email"
            />
          </div>
          <div className="signup-input--wrapper">
            <label className="signup-text--label">Password</label>
            <input
              className="signup-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              placeholder="********"
            />
          </div>
          <div className="signup-input--wrapper">
            <label className="signup-text--label">Confirm Password</label>
            <input
              className="signup-input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={inputHandler}
              placeholder="********"
            />
          </div>
          {loading ? (
            <button
              className="signup-btn signup-loading--state"
              onClick={handleSubmit}
              disabled
            >
              Loading...
            </button>
          ) : (
            <button className="signup-btn" onClick={handleSubmit}>
              Sign Up
            </button>
          )}
          <p className="signup-or-text">OR</p>
          <button className="signup-btn signup-btn--gmail" disabled>
            <figure className="google-icon--wrapper">
              <img src={googleIcon} alt="google icon" className="google-icon" />
            </figure>
            <p className="btn-para">Sign Up with Google</p>
          </button>
        <p className="link-register">
          Already have an account?{" "}
          <Link to="/login" className="register-span">
            Login
          </Link>
        </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

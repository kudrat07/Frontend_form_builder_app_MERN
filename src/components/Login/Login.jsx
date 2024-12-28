import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";
import backArrowLogo from "../../assets/arrow_back.png";
import orangeLogo from "../../assets/login-orange-logo.png";
import ellipseFirst from "../../assets/login-Ellipse 1.png";
import ellipseSecond from "../../assets/login-Ellipse 2.png";
import googleIcon from "../../assets/Google Icon.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email.trim()) {
      newError.email = "Please provide your email address";
    } else if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email =
        "Invalid email format. Please use a valid format like example@domain.com";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required";
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
        const response = await fetch(`${BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Logged in successfully!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("userId", data.userId)
          setFormData({
            email: "",
            password: "",
          });
          navigate("/dashboard");
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
    <div className="login-container">
      <button className="login-back--btn" onClick={handleBackBtn}>
        <img src={backArrowLogo} alt="arrow back logo" />
      </button>

      <img src={orangeLogo} alt="orange color logo" className="orange-logo" />
      <img src={ellipseFirst} alt="half circle" className="ellipse-first" />
      <img src={ellipseSecond} alt="half second" className="ellipse-second" />

      <form className="login-form" noValidate>
        <div className="login-form--container">
          <div className="login-input--wrapper">
            <label className="login-text--label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="login-input"
              onChange={inputHandler}
              placeholder="Enter your email"
            />
          </div>
          <div className="login-input--wrapper">
            <label className="login-text--label">Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              placeholder="********"
            />
          </div>
          {loading ? (
            <button
              className="login-btn login-loading--state"
              onClick={handleSubmit}
              disabled
            >
              Loading...
            </button>
          ) : (
            <button className="login-btn" onClick={handleSubmit}>
              Log In
            </button>
          )}
          <p className="or-text">OR</p>
          <button className="login-btn login-btn--gmail" disabled>
            <figure className="google-icon--wrapper">
              <img src={googleIcon} alt="google icon" className="google-icon" />
            </figure>
            <p className="btn-para">Sign In with Google</p>
          </button>
        </div>
        <p className="link-register">
          Don't have an account?{" "}
          <Link to="/register" className="register-span">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

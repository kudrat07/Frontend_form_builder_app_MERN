import React, { useState } from "react";
import styles from "./setting.module.css";
import userLogo from "../../assets/user-logo.png";
import viewLogo from "../../assets/view.png";
import lockLogo from "../../assets/lock.png";
import logoutLogo from "../../assets/Logout.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTheme from "../../contexts/Theme";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Setting = () => {
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("themeMode");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateError = () => {
    const newErrors = {};
    if (
      !formData.name.trim() &&
      !formData.email.trim() &&
      !formData.password.trim() &&
      !formData.newPassword.trim()
    ) {
      toast.error("Please fill atleast one field to update");
      return false;
    }

    if (formData.name.length < 3) {
      newErrors.name = "Name should be atleast 3 character long";
    }

    if (formData.email.trim()) {
      if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email =
          "Invalid email format. Please use a valid format like example@domain.com";
      }
    }

    if (formData.newPassword.trim()) {
      if (!formData.password.trim()) {
        newErrors.password = "Please provide old password";
      }

      if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters long";
      } else if (!/[a-z]/.test(formData.newPassword)) {
        newErrors.newPassword =
          "Password must contain atleast one lowercase letter";
      } else if (!/[A-Z]/.test(formData.newPassword)) {
        newErrors.newPassword =
          "Password must contain atleast one uppercase letter";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
        newErrors.newPassword =
          "Password must contain atleast one special character";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }
    return true;
  };

  const userId = localStorage.getItem("userId");
  const updateUser = async (formData) => {
    setLoading(true);
    const payload = {};
    if (formData.name.trim()) payload.name = formData.name;
    if (formData.email.trim()) payload.email = formData.email;
    if (formData.password.trim()) payload.password = formData.password;
    if (formData.newPassword.trim()) payload.newPassword = formData.newPassword;

    try {
      const response = await fetch(`${BACKEND_URL}/setting/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Update failed!");
      }
    } catch (error) {
      toast.error("Network error, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateError()) {
      updateUser(formData);
    }
  };

  return (
    <div className={`${styles.container} ${styles[themeMode]}`}>
      <div className={styles.content}>
        <h4 className={`${styles.heading} ${styles[themeMode]}`}>Settings</h4>
        <form noValidate className={styles.form}>
          <div className={styles.inputContainer}>
            <img src={userLogo} alt="user logo" className={styles.inputIcon} />
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              className={`${styles.input} ${styles[themeMode]}`}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.inputContainer}>
            <img src={lockLogo} alt="logo" className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Update Email"
              className={`${styles.input} ${styles[themeMode]}`}
              onChange={inputHandler}
            />
            <button className={styles.viewBtn}>
              <img src={viewLogo} alt="logo" />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <img src={lockLogo} alt="logo" className={styles.inputIcon} />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Old Password"
              value={formData.password}
              className={`${styles.input} ${styles[themeMode]}`}
              onChange={inputHandler}
            />
            <button
              className={styles.viewBtn}
              onClick={togglePasswordVisibility}
            >
              <img src={viewLogo} alt="logo" />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <img src={lockLogo} alt="logo" className={styles.inputIcon} />
            <input
              type={passwordVisible ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              className={`${styles.input} ${styles[themeMode]}`}
              onChange={inputHandler}
            />
            <button
              className={styles.viewBtn}
              onClick={togglePasswordVisibility}
            >
              <img src={viewLogo} alt="logo" />
            </button>
          </div>
          {loading ? (
            <button 
            className={`$styles.btnUpdate ${styles.loadingState}`} 
            onClick={handleSubmit}
            >
              Loading...
            </button>
          ) : (
            <button 
            className={styles.btnUpdate} 
            onClick={handleSubmit}>
              Update
            </button>
          )}
        </form>
        <button className={styles.logoutBtn} onClick={logoutHandler}>
          <img src={logoutLogo} alt="logo" className={styles.logoutLogo} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;

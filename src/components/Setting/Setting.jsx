import React, {useState} from "react";
import styles from "./setting.module.css";
import userLogo from "../../assets/user-logo.png";
import viewLogo from "../../assets/view.png";
import lockLogo from "../../assets/lock.png";
import logoutLogo from "../../assets/Logout.png";
import {useNavigate} from "react-router-dom";
import useTheme from "../../contexts/Theme";

const Setting = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const {themeMode} = useTheme();

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setPasswordVisible((prev) => !prev);
    }

    const logoutHandler = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/")
    }

  return (
    <div className={`${styles.container} ${styles[themeMode]}`}>
    <div className={styles.content}>
      <h4 className={`${styles.heading} ${styles[themeMode]}`}>Setting</h4>
      <form noValidate className={styles.form}>
        <div className={styles.inputContainer}>
          <img src={userLogo} alt="user logo" className={styles.inputIcon} />
          <input type="text" placeholder="Name" 
          className={`${styles.input} ${styles[themeMode]}`}
          />
        </div>
        <div className={styles.inputContainer}>
          <img src={lockLogo} alt="logo" className={styles.inputIcon} />
          <input 
          type="email"
           placeholder="Update Email" 
           className={`${styles.input} ${styles[themeMode]}`}
           />
          <button className={styles.viewBtn}>
            <img src={viewLogo} alt="logo" />
          </button>
        </div>
        <div className={styles.inputContainer}>
          <img src={lockLogo} alt="logo" className={styles.inputIcon} />
          <input 
          type={passwordVisible ? "text" : "password"}
          placeholder="Old Password" 
          className={`${styles.input} ${styles[themeMode]}`}
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
           placeholder="New Password"
           className={`${styles.input} ${styles[themeMode]}`}
            />
          <button 
          className={styles.viewBtn}
            onClick={togglePasswordVisibility}
          >
            <img src={viewLogo} alt="logo"/>
          </button>
        </div>
        <button className = {styles.btnSubmit}>Submit</button>
      </form>
      <button 
      className={styles.logoutBtn}
      onClick={logoutHandler}
      >
        <img src={logoutLogo} alt="logo" className={styles.logoutLogo} />
        Logout
      </button>
      </div>
    </div>
  );
};

export default Setting;

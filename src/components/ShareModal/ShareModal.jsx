import React, { useState } from "react";
import styles from "./shareModal.module.css";
import useTheme from "../../contexts/Theme";
import close from "../../assets/close.png";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ShareModal = ({ showShareModal}) => {
  const { themeMode } = useTheme();
  const [userEmail, setUserEmail] = useState("");
  const [permission, setPermission] = useState("");

  const token = localStorage.getItem("token");

  const validateError = () => {
    const newError = {};
    if (!userEmail.trim()) {
      newError.email = "Please provide user email address";
    } else if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      newError.email =
        "Invalid email format. Please use a valid format like example@domain.com";
    }
    if (!permission) {
      newError.email = "Please select permission edit or view";
    }

    if (Object.keys(newError).length > 0) {
      toast.error(Object.values(newError)[0]);
      return false;
    }
    return true;
  };

  const handlePermissionSelect = (e) => {
    if (e.target.value === "Edit") setPermission("edit");
    if (e.target.value === "View") setPermission("view");
  };

  const inviteHandler = async () => {
    if (validateError()) {
      try {
        const response = await fetch(`${BACKEND_URL}/shared/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },

          body: JSON.stringify({ userEmail, permission }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Invitation sent");
          setUserEmail("");
          setPermission("");
          showShareModal();
        } else {
          toast.error(data.message || "Invitation failed");
        }
      } catch (error) {
        toast.error(error.message || "Network error. Please try again later");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        onClick={showShareModal}
        className={`${styles.modal} ${styles[themeMode]}`}
      ></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.modalContent}>
          <figure className={styles.imgWrapper} onClick={showShareModal}>
            <img src={close} alt="" />
          </figure>
          <div className={styles.headerWrapper}>
            <h2 className={`${styles.heading} ${styles[themeMode]}`}>
              Invite by Email
            </h2>
            <select
              onChange={handlePermissionSelect}
              className={`${styles.select} ${styles[themeMode]}`}
            >
              <option className={`${styles.option} ${styles[themeMode]}`}>
                Select
              </option>
              <option className={`${styles.option} ${styles[themeMode]}`}>
                Edit
              </option>
              <option className={`${styles.option} ${styles[themeMode]}`}>
                View
              </option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              className={`${styles.input} ${styles[themeMode]}`}
              type="email"
              placeholder="Enter email id"
            />
            <button onClick={inviteHandler} className={styles.btn}>
              Send Invite
            </button>
          </div>

          <div className={styles.footerWrapper}>
            <h2
              className={`${styles.heading} ${styles.linkHeading} ${styles[themeMode]}`}
            >
              Invite by link
            </h2>
            <button className={styles.btn}>Copy link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

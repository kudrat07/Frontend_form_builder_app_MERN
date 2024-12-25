import React from "react";
import styles from "./shareModal.module.css";
import useTheme from "../../contexts/Theme";

const ShareModal = ({ showShareModal }) => {
  const { themeMode } = useTheme();
  return (
    <div className={styles.container}>
      <div onClick={showShareModal} className={styles.modal}></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.modalContent}>
          <div className={styles.headerWrapper}>
            <h2 className={`${styles.heading} ${styles[themeMode]}`}>
              Invite by Email
            </h2>
            <select className={`${styles.select} ${styles[themeMode]}`}>
              <option className={`${styles.option}{styles[themeMode]}`}>
                Edit
              </option>
              <option className={`${styles.option} ${styles[themeMode]}`}>
                View
              </option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${styles[themeMode]}`}
              type="email"
              placeholder="Enter email id"
            />
            <button className={styles.btn}>Send Invite</button>
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

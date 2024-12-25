import React from "react";
import styles from "./deleteForm.module.css";
import useTheme from "../../contexts/Theme";

const DeleteFormModal = ({showDeleteFormModal}) => {

  const {themeMode} = useTheme();
  return (
    <>
      <div className={styles.modal} onClick={showDeleteFormModal}></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles[themeMode]}`}>
            Are you sure want to delete this Form ?
          </h1>
          <div className={styles.btnWrapper}>
            <button className={styles.deleteBtn}>Confirm</button>
            <div className={styles.divider}></div>
            <button
              className={`${styles.cancelBtn} ${styles[themeMode]}`}
              onClick={showDeleteFormModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFormModal;

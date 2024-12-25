import React from "react";
import styles from "./deleteModal.module.css";
import useTheme from "../../contexts/Theme";

const DeleteModal = ({ showDeleteFolderModal }) => {
  const {themeMode} = useTheme();
  return (
    <>
    <div
     className={styles.modal}
        onClick={showDeleteFolderModal}
     ></div>
    <div className={`${styles.overlay} ${styles[themeMode]}`}>
      <div className={styles.container}>
        <h1 className={`${styles.title} ${styles[themeMode]}`}>
          Are you sure want to delete this Folder ?
        </h1>
        <div className={styles.btnWrapper}>
          <button className={styles.deleteBtn}>Confirm</button>
          <div className={styles.divider}></div>
          <button 
          className={`${styles.cancelBtn} ${styles[themeMode]}`}
          onClick={showDeleteFolderModal}
          >Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteModal;

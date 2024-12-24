import React from "react";
import styles from "./deleteModal.module.css";

const DeleteModal = ({ showDeleteFolderModal }) => {
  return (
    <>
    <div
     className={styles.modal}
        onClick={showDeleteFolderModal}
     ></div>
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Are you sure want to delete this Folder ?
        </h1>
        <div className={styles.btnWrapper}>
          <button className={styles.deleteBtn}>Confirm</button>
          <div className={styles.divider}></div>
          <button 
          className={styles.cancelBtn}
          onClick={showDeleteFolderModal}
          >Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteModal;

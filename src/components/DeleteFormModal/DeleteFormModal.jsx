import React from "react";
import styles from "./deleteForm.module.css";

const DeleteFormModal = ({showDeleteFormModal}) => {
  return (
    <>
      <div className={styles.modal} onClick={showDeleteFormModal}></div>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Are you sure want to delete this Form ?
          </h1>
          <div className={styles.btnWrapper}>
            <button className={styles.deleteBtn}>Confirm</button>
            <div className={styles.divider}></div>
            <button
              className={styles.cancelBtn}
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

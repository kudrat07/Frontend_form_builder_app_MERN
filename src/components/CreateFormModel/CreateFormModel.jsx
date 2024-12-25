import React from "react";
import styles from "./form.module.css";
import useTheme from "../../contexts/Theme";

const CreateFormModel = ({ showFormModal }) => {

  const { themeMode } = useTheme();
  const createFrom = (e) => {
    e.preventDefault();
    showFormModal();
  };

  return (
    <>
      <div
        onClick={showFormModal}
        className={`${styles.modal} ${styles[themeMode]}`}
      ></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles[themeMode]}`}>Create New Form</h1>
          <form>
            <input
              type="text"
              placeholder="Enter folder name"
              className={`${styles.folderInput} ${styles[themeMode]}`}
            />
            <div className={styles.btnWrapper}>
              <button className={styles.createBtn} onClick={createFrom}>
                Done
              </button>
              <div className={styles.divider}></div>
              <button className={`${styles.cancelBtn} ${styles[themeMode]}`} onClick={showFormModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateFormModel;

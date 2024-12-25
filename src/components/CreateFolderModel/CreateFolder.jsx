import React from "react";
import styles from "./folder.module.css";
import useTheme from "../../contexts/Theme";

const CreateFolder = ({ showModal }) => {
  const createFolder = (e) => {
    e.preventDefault();
    showModal();
  };
  const {themeMode} = useTheme();
  return (
    <>
      <div className={styles.modal} onClick={showModal}></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles[themeMode]}`}>Create New Folder</h1>
          <form>
            <input
              type="text"
              placeholder="Enter folder name"
              className={`${styles.folderInput} ${styles[themeMode]}`}
            />
            <div className={styles.btnWrapper}>
              <button className={styles.createBtn} onClick={createFolder}>
                Done
              </button>
              <div className={styles.divider}></div>
              <button className={`${styles.cancelBtn} ${styles[themeMode]}`} onClick={showModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateFolder;

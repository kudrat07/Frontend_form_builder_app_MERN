import React from "react";
import styles from "./folder.module.css";

const CreateFolder = ({showModal}) => {

    const createFolder = (e) => {   
        e.preventDefault()
        showModal();
    }
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create New Folder</h1>
        <form>
            <input 
            type="text" 
            placeholder="Enter folder name"
            className={styles.folderInput}
            />
            <div className={styles.btnWrapper}>
                <button
                 className={styles.createBtn}
                 onClick={createFolder}>
                 Done
                 </button>
                <div className={styles.divider}></div>
                <button 
                className={styles.cancelBtn}
                onClick={showModal}
                >
                Cancel

                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolder;

import React from "react";
import styles from "./deleteModal.module.css";
import useTheme from "../../contexts/Theme";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const DeleteModal = ({folderId, onClose, onFolderAdded, setClickedFolder, clickedFolder}) => {
  const {themeMode} = useTheme();


  const deleteFolderHandler = async() => {
    try {
      const response = await fetch(`${BACKEND_URL}/folder/${folderId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if(!response.ok) {
        toast.error(result.error)
      }
      if(response.ok) {
        toast.success("Folder Deleted")
        onFolderAdded();
        if(clickedFolder === folderId){
          setClickedFolder(null)
        }
      }
    } catch (error) {
      toast.error(error.message || "Network error Try Again")
    } finally{
      onClose();
    }

  }

  const cancelHandler = () => {
    onClose();
  }

  return ( 
    <>
    <div
     className={styles.modal}
        onClick={onClose}
     ></div>
    <div className={`${styles.overlay} ${styles[themeMode]}`}>
      <div className={styles.container}>
        <h1 className={`${styles.title} ${styles[themeMode]}`}>
          Are you sure want to delete this Folder ?
        </h1>
        <div className={styles.btnWrapper}>
          <button
           className={styles.deleteBtn}
           onClick={deleteFolderHandler}
           >
           Confirm
           </button>
          <div className={styles.divider}></div>
          <button 
          className={`${styles.cancelBtn} ${styles[themeMode]}`}
          onClick={cancelHandler}
          >Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteModal;

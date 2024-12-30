import React from "react";
import styles from "./deleteForm.module.css";
import useTheme from "../../contexts/Theme";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const DeleteFormModal = ({onClose, formId}) => {

  const deleteFormHandler = async()  =>{
    try {
      const response = await fetch(`${BACKEND_URL}/form/${formId}`,{
        method:"DELETE"
      });
      const result = await response.json();
      if(!response.ok) {
        toast.error(result.error)
      }
      if(response.ok) {
        toast.success("Form Deleted")
        console.log("deleted form id ", formId)
      }

    } catch (error) {
      toast.error(error.message)
    }finally{
      onClose();
    }
  }


  const {themeMode} = useTheme();
  return (
    <>
      <div className={`${styles.modal} ${styles[themeMode]}`} onClick={onClose}></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles[themeMode]}`}>
            Are you sure want to delete this Form ?
          </h1>
          <div className={styles.btnWrapper}>
            <button
            onClick={deleteFormHandler}
             className={styles.deleteBtn}
             >
             Confirm
             </button>
            <div className={styles.divider}></div>
            <button
              className={`${styles.cancelBtn} ${styles[themeMode]}`}
              onClick={onClose}
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

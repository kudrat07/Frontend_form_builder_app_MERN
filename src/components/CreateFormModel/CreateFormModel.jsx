import React, { useState } from "react";
import styles from "./form.module.css";
import useTheme from "../../contexts/Theme";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateFormModel = ({ showFormModal, folderId, userId, onFormAdded}) => {
  const [formName, setFormName] = useState("");

  const formData = {
    formName,
    folderId,
  };


  const createFromHander = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Please enter a file name");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/form/${userId}/${folderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Form Created");
        onFormAdded();
        setFormName("");
      } else {
        toast.error(data.message || "Form Already exist");
      }
    } catch (error) {
      toast.error("Network error. Please try again");
    } finally {
      showFormModal();
    }
  };

  const { themeMode } = useTheme();
  return (
    <>
      <div
        onClick={showFormModal}
        className={`${styles.modal} ${styles[themeMode]}`}
      ></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles[themeMode]}`}>
            Create New Form
          </h1>
          <form>
            <input
              type="text"
              placeholder="Enter form name"
              className={`${styles.folderInput} ${styles[themeMode]}`}
              onChange={(e) => setFormName(e.target.value)}
            />
            <div className={styles.btnWrapper}>
              <button className={styles.createBtn} onClick={createFromHander}>
                Done
              </button>
              <div className={styles.divider}></div>
              <button
                className={`${styles.cancelBtn} ${styles[themeMode]}`}
                onClick={showFormModal}
              >
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

import React, { useState } from "react";
import styles from "./folder.module.css";
import useTheme from "../../contexts/Theme";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const CreateFolder = ({ showModal, onFolderAdded, userId }) => {
  const [folderName, setFolderName] = useState("")

  const createFolder = async (e) => {
    e.preventDefault();
    if(!folderName.trim()) {
      toast.error("Please enter a folder name")
      return;
    } 
    try {
      const response = await fetch(`${BACKEND_URL}/folder/${userId}`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({folderName}),
      });
      const data = await response.json();
      if(response.ok) {
        toast.success("Folder Created");
        onFolderAdded();
        setFolderName("")
      } else{
        toast.error(data.message || "Folder Already exist")
      }
    } catch (error) {
      toast.error("Network error. Please try again")
    } finally{ showModal();}
    
    
  };

  const {themeMode} = useTheme();
  return (
    <>
      <div className={`${styles.modal} ${styles[themeMode]}`} onClick={showModal}></div>
      <div className={`${styles.overlay} ${styles[themeMode]}`}>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles[themeMode]}`}>Create New Folder</h1>
          <form>
            <input
              type="text"
              placeholder="Enter folder name"
              className={`${styles.folderInput} ${styles[themeMode]}`}
              onChange={(e)=>setFolderName(e.target.value)}
            />
            <div className={styles.btnWrapper}>
              <button 
              className={styles.createBtn}
               onClick={createFolder}>
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

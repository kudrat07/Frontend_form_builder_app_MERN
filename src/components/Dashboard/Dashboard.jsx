import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import folderSvg from "../../assets/folder-svg.png";
import deleteSvg from "../../assets/delete-svg.png";
import addFileSvg from "../../assets/add-svg.png";
import CreateFolder from "../CreateFolderModel/CreateFolder";
import CreateFormModel from "../CreateFormModel/CreateFormModel";
import DeleteModal from "../DeleteFolderModal/DeleteModal";
import DeleteFormModal from "../DeleteFormModal/DeleteFormModal";
import ShareModal from "../ShareModal/ShareModal";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useNavigate } from "react-router-dom";
import useTheme from "../../contexts/Theme";

const Dashboard = () => {
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [FormModal, setFormModal] = useState(false);
  const [deleteFolderModal, setDeleteFolderModal] = useState(false);
  const [deleteFormModal, setDeleteFormModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const showDeleteFolderModal = () => {
    setDeleteFolderModal((prev) => !prev);
  };

  const showDeleteFormModal = () => {
    setDeleteFormModal((prev) => !prev);
  };

  const showModal = () => {
    setShowFolderModal((prev) => !prev);
  };

  const showFormModal = () => {
    setFormModal((prev) => !prev);
  };
  const showShareModal = () => {
    setShareModal((prev) => !prev);
  }

  const settingHander = () => {
    navigate("/setting");
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "Setting") {
      settingHander();
    }
  };


  const {themeMode} = useTheme();


  

  return (
    <>
      <div className={`${styles.container} ${styles[themeMode]}`}>
        <nav className={`${styles.nav} ${styles[themeMode]}`}>
          <select className={`${styles.select} ${styles[themeMode]}`} onChange={handleSelectChange}>
            {token && <option className={`${styles.option} ${styles[themeMode]}`}> {username}'s workspace</option>}

            <option className={`${styles.option} ${styles[themeMode]}`}>Setting</option>
            <option className={`${styles.logout} ${styles.option} ${styles[themeMode]}`}>Logout</option>
          </select>

          <div className={styles.themeToggler}>
          <ThemeToggle/>
          </div>
          <button 
            onClick={showShareModal}
          className={styles.shareBtn}
          >Share</button>
          {shareModal && <ShareModal showShareModal={showShareModal} />}
        </nav>

        <div className={styles.content}>
          <div className={styles.folderWrapper}>
            <button className={`${styles.createFolderBtn} ${styles[themeMode]}`} onClick={showModal}>
              <img src={folderSvg} alt="svg" className={`${styles.img} ${styles[themeMode]}`}/> Create a folder
            </button>
            {showFolderModal && <CreateFolder showModal={showModal} />}
            <div className={`${styles.folder} ${styles[themeMode]}`}>
              <p className={`${styles.folderName} ${styles[themeMode]}`}>Computer Network</p>
              <button
                className={styles.deleteBtn}
                onClick={showDeleteFolderModal}
              >
                <img src={deleteSvg} alt="delete icon" />
              </button>
              {deleteFolderModal && (
                <DeleteModal showDeleteFolderModal={showDeleteFolderModal} />
              )}
            </div>
          </div>
          <div className={styles.filesWrapper}>
            <div className={styles.createFile}>
              <button className={styles.createFileBtn} onClick={showFormModal}>
                <img src={addFileSvg} alt="add button" />
              </button>
              {FormModal && <CreateFormModel showFormModal={showFormModal} />}
              <p className={styles.fileText}>Create a typebot</p>
            </div>
            <div className={`${styles.form} ${styles[themeMode]}`}>
              <button
                className={styles.deleteFormBtn}
                onClick={showDeleteFormModal}
              >
                <img
                  src={deleteSvg}
                  alt="delete button"
                  className={styles.deleteIcon}
                />
              </button>
              <p className={`${styles.formName} ${styles[themeMode]}`}>New form</p>
              {deleteFormModal && (
                <DeleteFormModal showDeleteFormModal={showDeleteFormModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

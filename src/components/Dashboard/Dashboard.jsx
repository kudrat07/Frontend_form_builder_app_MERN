import React, { useState } from "react";
import styles from "./dashboard.module.css";
import folderSvg from "../../assets/folder-svg.png";
import deleteSvg from "../../assets/delete-svg.png";
import addFileSvg from "../../assets/add-svg.png";
import CreateFolder from "../CreateFolderModel/CreateFolder";
import CreateFormModel from "../CreateFormModel/CreateFormModel";
import Setting from "../Setting/Setting";

const Dashboard = () => {
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [FormModal, setFormModal] = useState(false);
  const [setting, setSetting] = useState(false);

  const showModal = () => {
    setShowFolderModal((prev) => !prev);
  };

  const showFormModal = () => {
    setFormModal((prev) => !prev);
  };

  const handleDeleteFolder = () => {
    alert("Delete button clicked");
  };

  const settingHander = () => {
    setSetting((prev) => !prev);
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "Setting") {
      settingHander();
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <nav>
          <select className={styles.select} onChange={handleSelectChange}>
            <option>Dewank Rastogi workspace's</option>
            <option>Setting</option>
            <option className={styles.logout}>Logout</option>
          </select>
        </nav>
        {setting ? (
          <Setting />
        ) : (
          <div className={styles.content}>
            <div className={styles.folderWrapper}>
              <button className={styles.createFolderBtn} onClick={showModal}>
                <img src={folderSvg} alt="svg" /> Create a folder
              </button>
              {showFolderModal && <CreateFolder showModal={showModal} />}
              <div className={styles.folder}>
                <p className={styles.folderName}>Computer Network</p>
                <button
                  className={styles.deleteBtn}
                  onClick={handleDeleteFolder}
                >
                  <img src={deleteSvg} alt="delete icon" />
                </button>
              </div>
            </div>
            <div className={styles.filesWrapper}>
              <div className={styles.createFile}>
                <button
                  className={styles.createFileBtn}
                  onClick={showFormModal}
                >
                  <img src={addFileSvg} alt="add button" />
                </button>
                {FormModal && <CreateFormModel showFormModal={showFormModal} />}
                <p className={styles.fileText}>Create a typebot</p>
              </div>
              <div className={styles.form}>
                <button className={styles.deleteFormBtn}>
                  <img
                    src={deleteSvg}
                    alt="delete button"
                    className={styles.deleteIcon}
                  />
                </button>
                <p className={styles.formName}>New form</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

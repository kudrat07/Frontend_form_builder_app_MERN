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
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useTheme from "../../contexts/Theme";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [FormModal, setFormModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState({});

  const [clickedFolder, setClickedFolder] = useState();

  const [deleteFolder, setDeleteFolder] = useState(false);
  const [folderId, setFolderId] = useState(null);

  // const [formId, setFormId] = useState(null);
  const [deleteFormModal, setDeleteFormModal] = useState(false);
  const [formId, setFormId] = useState(null);

  const username = localStorage.getItem("username");

  const { id } = useParams();

  // fetching all folders
  const fetchFolders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/folder/${id}`);
      if (!response.ok) {
        toast.error("HTTP Error");
      }
      const results = await response.json();
      setFolders(results);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchForms = async (folderId = null) => {
    try {
      const url = folderId
        ? `${BACKEND_URL}/form/${id}/${folderId}`
        : `${BACKEND_URL}/form/${id}`;

      const response = await fetch(url);
      if (!response.ok) {
        toast.error("Server Error");
      }
      const data = await response.json();
      setForms(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    fetchForms(folderId);
  }, [FormModal, formId]);

  const showModal = () => {
    setShowFolderModal((prev) => !prev);
  };

  const showFormModal = () => {
    setFormModal((prev) => !prev);
  };
  const showShareModal = () => {
    setShareModal((prev) => !prev);
  };

  const deleteFolderHandler = async (id) => {
    setDeleteFolder(true);
    setFolderId(id);
  };

  const settingHander = () => {
    navigate("/setting");
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "Setting") {
      settingHander();
    }
  };

  const handleFolderClick = (id) => {
    setFolderId(id);
    setClickedFolder(id);
    fetchForms(id);
  };

  const deleteFormHandler = (id) => {
    setFormId(id);
    setDeleteFormModal(true);
  };

  const { themeMode } = useTheme();

  return (
    <>
      <div className={`${styles.container} ${styles[themeMode]}`}>
        <nav className={`${styles.nav} ${styles[themeMode]}`}>
          <select
            className={`${styles.select} ${styles[themeMode]}`}
            onChange={handleSelectChange}
          >
            <option className={`${styles.option} ${styles[themeMode]}`}>
              {" "}
              {username}'s workspace
            </option>

            <option className={`${styles.option} ${styles[themeMode]}`}>
              Setting
            </option>
            <option
              className={`${styles.logout} ${styles.option} ${styles[themeMode]}`}
            >
              Logout
            </option>
          </select>

          <div className={styles.themeToggler}>
            <ThemeToggle />
          </div>
          <button onClick={showShareModal} className={styles.shareBtn}>
            Share
          </button>
          {shareModal && <ShareModal showShareModal={showShareModal} />}
        </nav>

        <div className={styles.content}>
          <div className={styles.folderWrapper}>
            <button
              className={`${styles.createFolderBtn} ${styles[themeMode]}`}
              onClick={showModal}
            >
              <img
                src={folderSvg}
                alt="svg"
                className={`${styles.img} ${styles[themeMode]}`}
              />{" "}
              Create a folder
            </button>
            {showFolderModal && (
              <CreateFolder
                showModal={showModal}
                onFolderAdded={fetchFolders}
                userId = {id}
              />
            )}

            {folders.length > 0 &&
              folders.map((folder) => (
                <div
                  key={folder._id}
                  className={`${styles.folder} ${
                    clickedFolder === folder._id ? styles.selectedFolder : ""
                  } ${styles[themeMode]}`}
                >
                  <button
                    onClick={() => handleFolderClick(folder._id)}
                    className={`${styles.folderName} ${styles[themeMode]}`}
                  >
                    {folder.folderName}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteFolderHandler(folder._id)}
                  >
                    <img src={deleteSvg} alt="delete icon" />
                  </button>
                  {deleteFolder && (
                    <DeleteModal
                      onFolderAdded={fetchFolders}
                      folderId={folderId}
                      setClickedFolder={setClickedFolder}
                      clickedFolder={clickedFolder}
                      setFolderId={setFolderId}
                      onClose={() => setDeleteFolder(false)}
                    />
                  )}
                </div>
              ))}
          </div>
          <div className={styles.filesWrapper}>
            <div className={styles.createFile}>
              <button className={styles.createFileBtn} onClick={showFormModal}>
                <img src={addFileSvg} alt="add button" />
              </button>
              {FormModal && (
                <CreateFormModel
                  showFormModal={showFormModal}
                  folderId={folderId}
                  onFormAdded={fetchForms}
                  userId = {id}
                />
              )}
              <p className={styles.fileText}>Create a typebot</p>
            </div>

            {forms.length > 0 &&
              forms.map((form) => (
                <div
                  key={form._id}
                  className={`${styles.form} ${styles[themeMode]}`}
                >
                  <button
                    className={styles.deleteFormBtn}
                    onClick={() => deleteFormHandler(form._id)}
                  >
                    <img
                      src={deleteSvg}
                      alt="delete button"
                      className={styles.deleteIcon}
                    />
                  </button>

                  <p className={`${styles.formName} ${styles[themeMode]}`}>
                    {form.formName}
                  </p>
                </div>
              ))}
            {deleteFormModal && (
              <DeleteFormModal
                onClose={() => {
                  setDeleteFormModal(false);
                  setFormId(null);
                }}
                formId={formId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

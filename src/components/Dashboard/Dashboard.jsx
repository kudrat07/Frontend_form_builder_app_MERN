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
  const [forms, setForms] = useState([]);

  const [clickedFolder, setClickedFolder] = useState();

  const [deleteFolder, setDeleteFolder] = useState(false);
  const [folderId, setFolderId] = useState(null);

  const [deleteFormModal, setDeleteFormModal] = useState(false);
  const [formId, setFormId] = useState(null);

  const [owners, setOwners] = useState([]);
  const [ownerId, setOwnerId] = useState([]);
  const [permission, setPermission] = useState(false);
  const [ownerName, selectOwnerName] = useState([]);

  const username = localStorage.getItem("username");

  const { id } = useParams();

  // fetching all folders
  const fetchFolders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/folder/${id}`);
      if (!response.ok) {
        toast.error("Something went wrong while fetching folders");
        return;
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
        toast.error("Something went wrong while fetching forms");
        return;
      }
      const data = await response.json();
      setForms(data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/findOwner/${id}`);
        if (!response.ok) {
          toast.error("Something went wrong while fetching owner");
          return;
        }
        const data = await response.json();
        setOwners(data.owners);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchOwner();
  }, []);

  useEffect(() => {
    fetchFolders();
    if (folderId !== null) {
      fetchForms(folderId);
    } else {
      fetchForms();
    }
  }, [folderId, formId, id, ownerId]);

  const showModal = () => {
    if (permission) {
      toast.error("You don't have permission to create folder");
      return;
    }
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
    setPermission(false);
    const selectedValue = e.target.value;

    if (selectedValue === "Setting") {
      settingHander();
      return;
    }

    if (selectedValue === "Logout") {
      logoutHandler();
      return;
    }

    // Check if selectedValue matches the logged-in user's name
    if (selectedValue === username) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setOwnerId(userId); // Set the ownerId for the logged-in user
        navigate(`/dashboard/${userId}`);
      } else {
        console.error("User ID not found in localStorage.");
      }
      return;
    }

    // Navigate to the selected owner's workspace
    const currentUser = owners.find((owner) => owner.ownerId === selectedValue);

    if (currentUser && currentUser.permission === "edit") {
      console.log(currentUser);
      setOwnerId(currentUser.ownerId);
      navigate(`/dashboard/${currentUser.ownerId}`);
    } else if (currentUser && currentUser.permission === "view") {
      setPermission(true);
      setOwnerId(currentUser.ownerId);
      navigate(`/dashboard/${currentUser.ownerId}`);
    } else {
      console.error("Owner not found for the selected value:", selectedValue);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
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

  const naviagetToWorkSpace = (formId) => {
    localStorage.setItem("formId", formId);
    navigate(`/workspace/${formId}`);
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
            <option
              value={username}
              className={`${styles.option} ${styles[themeMode]}`}
            >
              {" "}
              {username}'s workspace
            </option>

            {owners.map((owner) => (
              <option
                key={owner.ownerId}
                value={owner.ownerId}
                className={`${styles.option} ${styles[themeMode]}`}
              >
                {`${owner.ownerName}'s workspace`}{" "}
              </option>
            ))}

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
                userId={id}
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
                  onFormAdded={() => {
                    fetchForms(folderId);
                  }}
                  userId={id}
                />
              )}
              <p
                className={styles.fileText}
                onClick={() => navigate(`/dashboard/${idd}`)}
              >
                Create a typebot
              </p>
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

                  <p
                    onClick={() => naviagetToWorkSpace(form._id)}
                    className={`${styles.formName} ${styles[themeMode]}`}
                  >
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
                setFormId={setFormId}
                onFormAdded={() => fetchForms(folderId)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

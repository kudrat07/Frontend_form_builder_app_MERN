import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./workSpace.module.css";
import useTheme from "../../contexts/Theme";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import closeSvg from "../../assets/close.png";
import bubbleText from "../../assets/bubble-text-svg.png";
import bubbleImg from "../../assets/bubble-img-svg.png";
import bubbleVdo from "../../assets/bubble-vdo-svg.png";
import bubbleGif from "../../assets/bubble-gif.png";
import text from "../../assets/text-svg.png";
import number from "../../assets/number.png";
import email from "../../assets/email-svg.png";
import phone from "../../assets/phone.png";
import date from "../../assets/date.png";
import rating from "../../assets/rating.png";
import button from "../../assets/button.png";
import flag from "../../assets/flag-vector.png";
import blueFlag from "../../assets/flag_blue.png";
import deleteSvg from "../../assets/delete-svg.png";
import Response from "../Response/Response";
import toast from "react-hot-toast"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const WorkSpace = () => {
  const { themeMode } = useTheme();
  const imageSrc = themeMode === "light" ? blueFlag : flag;

  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("btnPrimary");
  const [bubbles, setBubbles] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const showBubble = (type) => {
    setBubbles([...bubbles, { id: bubbles.length, type, value: "" }]);
  };

  const validateBubbles = () => {
    // Check if there is a submitButton in the bubbles array
    const submitButtonExists = bubbles.some(bubble => bubble.type === "submitButton");
  
    // If no submitButton is found, show an error toast and return false
    if (!submitButtonExists) {
      toast.error("A submit button is required to submit the form.");
      return false;
    }
  
    // Check if there is at least one input field (text, number, etc.) and it's not empty
    const requiredInputs = ["text", "bubbleText", "bubbleImage", "number", "email", "phone", "date", "rating"];
    const inputExists = bubbles.some(
      (bubble) => requiredInputs.includes(bubble.type) && bubble.value.trim() !== ""
    );
  
    if (!inputExists) {
      toast.error("You must select at least one input field with a value.");
      return false;
    }
  
    // Check for any required inputs that are empty
    const invalidBubbles = bubbles.filter(
      (bubble) => requiredInputs.includes(bubble.type) && bubble.value.trim() === ""
    );
  
    // If there are invalid (empty) required fields, show an error toast
    if (invalidBubbles.length > 0) {
      toast.error("Some required fields are empty. Please fill them out.");
      return false;
    }
  
    return true;
  };
  


  const formId = localStorage.getItem('formId');


  const save = async () => {
    if (validateBubbles()) {
      try {
        const response = await fetch(`${BACKEND_URL}/bubble/${formId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bubbles }),
        });
  
        const data = await response.json();
        if (response.ok) {
          toast.success("Saved successfully");
          setBubbles([]);
          setIsSaved(true);
        } else {
          toast.error("Failed to save the form.");
        }
      } catch (error) {
        toast.error("Network error");
      }
    }
  };

  const copyToClipboard = async() => {
    try {
      const link = "https://kudrat-form-builder-app.vercel.app/form";
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link to clipboard");
      
    }
   };
  
  


  const handleInputChange = (id, value) => {
    const updatedBubbles = bubbles.map((bubble) =>
      bubble.id === id ? { ...bubble, value } : bubble
    );
    setBubbles(updatedBubbles);
  };

  const removeBubble = (id) => {
    const updatedBubbles = bubbles.filter((bubble) => bubble.id !== id);
    setBubbles(updatedBubbles);
  };

  const navigateToDashboard = () => {
    navigate(-1)
  }

  console.log(isSaved);


  return (
    <>
      <nav className={`${styles.nav} ${styles[themeMode]}`}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter form name"
            className={`${styles.input} ${styles[themeMode]}`}
          />
        </div>

        <div className={styles.navBtnWrapper}>
          <button
            className={`${styles.btn} ${
              activeButton === "btnPrimary" ? styles.active : ""
            } ${styles[themeMode]}`}
            onClick={() => setActiveButton("btnPrimary")}
          >
            Flow
          </button>
          <button
            id="responseBtn"
            className={`${styles.btn} ${
              activeButton === "btnSecondary" ? styles.active : ""
            } ${styles[themeMode]}`}
            onClick={() => setActiveButton("btnSecondary")}
          >
            Response
          </button>
        </div>

        <div className={styles.themeToggler}>
          <ThemeToggle />
        </div>
        <div className={styles.wrapper}>
          <button
          onClick={copyToClipboard}
           className={`${styles.shareBtn} ${styles[themeMode]}`}
           disabled = {!isSaved}
           >
            Share
          </button>
          <button
          onClick={save}
           className={`${styles.saveBtn} ${styles[themeMode]}`}
           >
            Save
          </button>
          <button 
          onClick = {navigateToDashboard}
          className={styles.closeBtn}>
            <img src={closeSvg} alt="close" />
          </button>
        </div>
      </nav>
      {activeButton === "btnPrimary" ? (
        <div className={`${styles.container} ${styles[themeMode]}`}>
          <div className={`${styles.sidebar} ${styles[themeMode]}`}>
            <div className={styles.sidebarContent}>
              <h3 className={`${styles.bubble} ${styles[themeMode]}`}>
                Bubbles
              </h3>
              <div className={styles.btnWrapper}>
                <button
                  onClick={() => showBubble("bubbleText")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={bubbleText} alt="Text Bubble" />
                  Text
                </button>
                <button
                  onClick={() => showBubble("bubbleImage")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={bubbleImg} alt="Image Bubble" />
                  Image
                </button>
                <button
                  className={`${styles.button} ${styles.disable} ${styles[themeMode]} $`}
                >
                  <img src={bubbleVdo} alt="Video Bubble" />
                  Video
                </button>
                <button
                  className={`${styles.button} ${styles.disable} ${styles[themeMode]}`}
                >
                  <img src={bubbleGif} alt="GIF Bubble" />
                  GIF
                </button>
              </div>
            </div>
            <div className={styles.sidebarContent2}>
              <h3 className={`${styles.bubble} ${styles[themeMode]}`}>
                Inputs
              </h3>
              <div className={styles.btnWrapper}>
                <button
                  onClick={() => showBubble("text")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={text} alt="Text Input" />
                  Text
                </button>

                <button
                  onClick={() => showBubble("number")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={number} alt="Number Input" />
                  Number
                </button>

                <button
                  onClick={() => showBubble("email")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={email} alt="Email Input" />
                  Email
                </button>

                <button
                  onClick={() => showBubble("phone")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={phone} alt="Phone Input" />
                  Phone
                </button>

                <button
                  onClick={() => showBubble("date")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={date} alt="Date Input" />
                  Date
                </button>

                <button
                  onClick={() => showBubble("rating")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={rating} alt="Rating Input" />
                  Rating
                </button>

                <button
                  onClick={() => showBubble("submitButton")}
                  className={`${styles.button} ${styles[themeMode]}`}
                >
                  <img src={button} alt="Button Input" />
                  Buttons
                </button>
              </div>
            </div>
          </div>
          <div className={styles.mainContent}>
            <main className={styles.main}>
              <div className={`${styles.mainHeading} ${styles[themeMode]}`}>
                <img
                  src={imageSrc}
                  className={`${styles.flagImg} ${styles[themeMode]}`}
                  alt="Flag"
                />
                Start
              </div>

              {bubbles.map((bubble) => (
                <div key={bubble.id}>
                {
                  bubble.type === "bubbleText" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Text
                    </label>
                    <figure className={styles.bubbleTextWrapper}>
                      <img
                        src={bubbleText}
                        className={styles.inputLogo}
                        alt="Bubble"
                      />
                    </figure>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                    <input
                      className={`${styles.inputBubble} ${styles[themeMode]}`}
                      type="text"
                      id={`bubble-${bubble.id}`}
                      value={bubble.value}
                      onChange={(e) =>
                        handleInputChange(bubble.id, e.target.value)
                      }
                      placeholder={"Click here to edit text"}
                    />
                  </div>
                }

                {
                  bubble.type === "bubbleImage" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Image
                    </label>
                    <figure className={styles.bubbleTextWrapper}>
                      <img
                        src={bubbleImg}
                        className={styles.inputLogo}
                        alt="Bubble"
                      />
                    </figure>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                    <input
                      className={`${styles.inputBubble} ${styles.formInput}  ${styles[themeMode]}`}
                      type="text"
                      id={`bubble-${bubble.id}`}
                      value={bubble.value}
                      onChange={(e) =>
                        handleInputChange(bubble.id, e.target.value)
                      }
                      placeholder={"Click to add link"}
                    />
                  </div>
                }

                {
                  bubble.type === "text" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Text
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                    <input
                      className={`${styles.inputBubble} ${styles.formInput} ${styles[themeMode]} `}
                      type="text"
                      id={`bubble-${bubble.id}`}
                      value={bubble.value}
                      onChange={(e) =>
                        handleInputChange(bubble.id, e.target.value)
                      }
                      placeholder={"Give placeholder for text"}
                    />
                  </div>
                }
                  
                {
                  bubble.type === "number" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Number
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                    <input
                      className={`${styles.inputBubble} ${styles.formInput} ${styles[themeMode]} `}
                      type="text"
                      id={`bubble-${bubble.id}`}
                      value={bubble.value}
                      onChange={(e) =>
                        handleInputChange(bubble.id, e.target.value)
                      }
                      placeholder={"Give placeholder for number"}
                    />
                  </div>
                }

                {
                  bubble.type === "email" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Email
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                      <p className={`${styles.para}`}>Hint : User will input a email on his form</p>
                  </div>
                }

                {
                  bubble.type === "phone" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Phone
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                      <p className={`${styles.para}`}>Hint : User will input a phone on his form</p>
                  </div>
                }

                {
                  bubble.type === "date" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Date
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                      <p className={`${styles.para}`}>Hint : User will select a date</p>
                  </div>
                }

                {
                  bubble.type === "rating" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Rating
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                      <p className={`${styles.para}`}>Hint : User will tap to rate out of 5</p>
                  </div>
                }
                {
                  bubble.type === "submitButton" && 
                  <div className={`${styles.bubbleInput} ${styles[themeMode]}`}>
                    <label
                      htmlFor={`bubble-${bubble.id}`}
                      className={`${styles.label} ${styles[themeMode]}`}
                    >
                      Input Button
                    </label>
                    <figure
                      className={styles.deleteSvgWrapper}
                      onClick={() => removeBubble(bubble.id)}
                    >
                      <img
                        src={deleteSvg}
                        className={styles.deleteSvg}
                        alt="Delete"
                      />
                    </figure>
                      <p className={`${styles.para}`}>Hint : Submit button will appear on screen</p>
                  </div>
                }
                  
                </div>
              ))}
            </main>
          </div>
        </div>
      ) : (
        <Response />
      )}
    </>
  );
};

export default WorkSpace;

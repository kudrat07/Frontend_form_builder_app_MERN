import React, { useState } from "react";
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

const WorkSpace = () => {
  const { themeMode } = useTheme();
  const imageSrc = themeMode === "light" ? blueFlag : flag;

  const [activeButton, setActiveButton] = useState("btnPrimary");
  const [showTextBubble, setShowTextBubble] = useState([]);

  const showBubble = () => {
    setShowTextBubble([
      ...showTextBubble,
      { id: showTextBubble.length, value: "" },
    ]);
  };

  const handleInputChange = (id, value) => {
    const updatedBubbles = showTextBubble.map((bubble) =>
      bubble.id === id ? { ...bubble, value } : bubble
    );
    setShowTextBubble(updatedBubbles);
  };

  const removeBubble = (id) => {
    const updatedBubbles = showTextBubble.filter((bubble) => bubble.id !== id);
    setShowTextBubble(updatedBubbles);
  };

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
          <button className={`${styles.shareBtn} ${styles[themeMode]}`}>
            Share
          </button>
          <button className={`${styles.saveBtn} ${styles[themeMode]}`}>
            Save
          </button>
          <button className={styles.closeBtn}>
            <img src={closeSvg} alt="close" />
          </button>
        </div>
      </nav>
      <div className={`${styles.container} ${styles[themeMode]}`}>
        <div className={`${styles.sidebar} ${styles[themeMode]}`}>
          <div className={styles.sidebarContent}>
            <h3 className={`${styles.bubble} ${styles[themeMode]}`}>Bubbles</h3>
            <div className={styles.btnWrapper}>
              <button
                onClick={showBubble}
                className={`${styles.button} ${styles[themeMode]}`}
              >
                <img src={bubbleText} alt="Text Bubble" />
                Text
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={bubbleImg} alt="Image Bubble" />
                Image
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={bubbleVdo} alt="Video Bubble" />
                Video
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={bubbleGif} alt="GIF Bubble" />
                GIF
              </button>
            </div>
          </div>
          <div className={styles.sidebarContent2}>
            <h3 className={`${styles.bubble} ${styles[themeMode]}`}>Inputs</h3>
            <div className={styles.btnWrapper}>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={text} alt="Text Input" />
                Text
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={number} alt="Number Input" />
                Number
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={email} alt="Email Input" />
                Email
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={phone} alt="Phone Input" />
                Phone
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={date} alt="Date Input" />
                Date
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
                <img src={rating} alt="Rating Input" />
                Rating
              </button>
              <button className={`${styles.button} ${styles[themeMode]}`}>
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
            {showTextBubble.map((bubble) => (
              <div
                key={bubble.id}
                className={`${styles.bubbleInput} ${styles[themeMode]}`}
              >
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
                  onChange={(e) => handleInputChange(bubble.id, e.target.value)}
                  placeholder="Click to edit text"
                />
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
};

export default WorkSpace;

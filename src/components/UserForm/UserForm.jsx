import React, { useState, useEffect } from "react";
import sendIcon from "../../assets/send.png";
import labelIcon from "../../assets/label-icon.png";
import useTheme from "../../contexts/Theme";
import styles from "./form.module.css";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserForm = () => {
  const { themeMode } = useTheme();
  const [bubbles, setBubbles] = useState([]);
  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0); // Start from first input bubble
  const [filledInputs, setFilledInputs] = useState({}); // Store input values
  const [displayedValues, setDisplayedValues] = useState([]); // Store displayed values for right container

  const fetchResponse = async () => {
    try {
      const formId = localStorage.getItem("formId");
      const response = await fetch(`${BACKEND_URL}/bubble/${formId}`);
      if (!response.ok) {
        toast.error("Something went wrong");
        return;
      }

      const data = await response.json();
      const bubble = data[0].bubbles;
      setBubbles(bubble);
    } catch (error) {
      toast.error("Failed to fetch data from backend");
    }
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  const handleNextBubble = (bubbleId, value) => {
    // Proceed to next bubble after confirmation (send button clicked)
    setFilledInputs((prevInputs) => ({
      ...prevInputs,
      [bubbleId]: value,
    }));

    setDisplayedValues((prevValues) => [
      ...prevValues,
      { bubbleId, value }, // Add the value to the displayed container
    ]);

    // Move to the next bubble (only if it's an input)
    setCurrentBubbleIndex((prevIndex) => prevIndex + 1);
  };

  const handleInputChange = (e, bubbleId) => {
    const value = e.target.value;
    setFilledInputs((prevInputs) => ({
      ...prevInputs,
      [bubbleId]: value, // Update the input field immediately
    }));
  };

  const handleSendButtonClick = (bubbleId, value) => {
    // Confirm the input and proceed to next bubble
    handleNextBubble(bubbleId, value);
  };

  const renderBubble = (bubble) => {
    switch (bubble.type) {
      case "bubbleText":
        return (
          <div className={styles.row}>
            <div className={styles.bubbleContainer}>
              <img src={labelIcon} alt="label" className={styles.labelIcon} />
              <div className={styles.bubble}>{bubble.value}</div>
            </div>
          </div>
        );
      case "bubbleImage":
        return (
          <div className={styles.row}>
            <div className={styles.bubbleContainer}>
              <img
                src={bubble.value}
                alt="Bubble Image"
                className={styles.bubbleImage}
              />
            </div>
          </div>
        );
      case "text":
      case "email":
      case "number":
      case "phone":
      case "date":
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <input
                className={styles.input}
                type={bubble.type === "phone" ? "tel" : bubble.type}
                name="inputField"
                placeholder={bubble.value}
                value={filledInputs[bubble._id] || ""} // Display the filled input
                onChange={(e) => handleInputChange(e, bubble._id)} // Update immediately on change
                required
              />
              <button
                type="button"
                onClick={() => handleSendButtonClick(bubble._id, filledInputs[bubble._id] || "")}
                className={styles.sendButton}
              >
                <img src={sendIcon} alt="send" className={styles.sendIcon} />
              </button>
            </div>
          </div>
        );
      case "submitButton":
        return (
          <div className={styles.inputContainer}>
            <button type="submit" className={styles.sendButton}>
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Render all non-input bubbles (bubbleText, bubbleImage) first */}
      {bubbles.map((bubble) => (
        (bubble.type === "bubbleText" || bubble.type === "bubbleImage") && (
          <div key={bubble._id}>{renderBubble(bubble)}</div>
        )
      ))}

      {/* Render the current input field or bubble if there is one */}
      {bubbles.slice(currentBubbleIndex).map((bubble) => {
        // Only show input bubbles one by one after the initial non-input bubbles
        if (bubble.type !== "bubbleText" && bubble.type !== "bubbleImage") {
          return (
            <div key={bubble._id}>
              {renderBubble(bubble)}
            </div>
          );
        }
        return null;
      })}

      {/* Display the input values on the right of the screen */}
      <div className={styles.rightContainer}>
        {displayedValues.map((input, index) => (
          <div key={index} className={styles.displayedInput}>
            <strong>{bubbles.find((bubble) => bubble._id === input.bubbleId)?.value}:</strong> {input.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm;

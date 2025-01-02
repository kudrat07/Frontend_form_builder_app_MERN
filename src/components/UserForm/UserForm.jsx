import React, { useState } from "react";
import sendIcon from "../../assets/send.png";
import labelIcon from "../../assets/label-icon.png";
import useTheme from "../../contexts/Theme";
import styles from "./form.module.css";

const UserForm = () => {
  const { themeMode } = useTheme();
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({
    name: "",
    age: "",
    city: "",
    hobby: "",
  });

  const handleSubmit = (event, field) => {
    event.preventDefault();
    const value = event.target.elements.inputField.value;

    setResponses({
      ...responses,
      [field]: value,
    });

    setStep(step + 1);
    event.target.reset(); // Clear the input field
  };

  console.log(responses);

  return (
    <div className={styles.container}>
      {step >= 1 && (
        <div className={styles.row}>
          <div className={styles.bubbleContainer}>
            <img src={labelIcon} alt="label" className={styles.labelIcon} />
            <div className={styles.bubble}>Hello! What's your name?</div>
          </div>
        </div>
      )}

      {/* Input for Name */}
      {step === 1 && (
        <div className={styles.inputContainer}>
          <form
            onSubmit={(e) => handleSubmit(e, "name")}
            className={styles.inputForm}
          >
            <input
              className={styles.input}
              type="text"
              name="inputField"
              placeholder="Enter your name"
              required
            />
            <button type="submit" className={styles.sendButton}>
              <img src={sendIcon} alt="send" className={styles.sendIcon} />
            </button>
          </form>
        </div>
      )}

      {/* Reply for Name */}
      {step >= 2 && (
        <div className={styles.row}>
          <div className={styles.bubbleUser}>{responses.name}</div>
        </div>
      )}

      {/* Second Question */}
      {step >= 2 && (
        <div className={styles.row}>
          <div className={styles.bubble}>
            Nice to meet you, {responses.name}! How old are you?
          </div>
        </div>
      )}

      {/* Input for Age */}
      {step === 2 && (
        <div className={styles.inputContainer}>
          <form
            onSubmit={(e) => handleSubmit(e, "age")}
            className={styles.inputForm}
          >
            <input
              className={styles.input}
              type="text"
              name="inputField"
              placeholder="Enter your name"
              required
            />
            <button type="submit" className={styles.sendButton}>
              <img src={sendIcon} alt="send" className={styles.sendIcon} />
            </button>
          </form>
        </div>
      )}

      {/* Reply for Age */}
      {step >= 3 && (
        <div className={styles.row}>
          <div className={styles.bubbleUser}>{responses.age}</div>
        </div>
      )}

      {/* Third Question */}
      {step >= 3 && (
        <div className={styles.row}>
          <div className={styles.bubble}>Great! Where are you from?</div>
        </div>
      )}

      {/* Input for City */}
      {step === 3 && (
        <div className={styles.inputContainer}>
          <form
            onSubmit={(e) => handleSubmit(e, "city")}
            className={styles.inputForm}
          >
            <input
              className={styles.input}
              type="text"
              name="inputField"
              placeholder="Enter your name"
              required
            />
            <button type="submit" className={styles.sendButton}>
              <img src={sendIcon} alt="send" className={styles.sendIcon} />
            </button>
          </form>
        </div>
      )}

      {/* Reply for City */}
      {step >= 4 && (
        <div className={styles.row}>
          <div className={styles.bubbleUser}>{responses.city}</div>
        </div>
      )}

      {/* Fourth Question */}
      {step >= 4 && (
        <div className={styles.row}>
          <div className={styles.bubble}>
            Nice! What is your favorite hobby?
          </div>
        </div>
      )}

      {/* Input for Hobby */}
      {step === 4 && (
        <div className={styles.inputContainer}>
          <form
            onSubmit={(e) => handleSubmit(e, "hobby")}
            className={styles.inputForm}
          >
            <input
              className={styles.input}
              type="text"
              name="inputField"
              placeholder="Enter your name"
              required
            />
            <button type="submit" className={styles.sendButton}>
              <img src={sendIcon} alt="send" className={styles.sendIcon} />
            </button>
          </form>
        </div>
      )}

      {/* Reply for Hobby */}
      {step >= 5 && (
        <div className={styles.row}>
          <div className={styles.bubbleUser}>{responses.hobby}</div>
        </div>
      )}
    </div>
  );
};

export default UserForm;

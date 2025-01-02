import React, { useState, useEffect } from "react";
import sendIcon from "../../assets/send.png";
import labelIcon from "../../assets/label-icon.png";
import useTheme from "../../contexts/Theme";
import styles from "./form.module.css";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserForm = () => {
  const { themeMode } = useTheme();
  const [bubbles, setBubbles] = useState([]);



  const fetchResponse = async () => {
    try {
      console.log("formId", formId)
      const response = await fetch(`${BACKEND_URL}/bubble/${formId}`);
      console.log("testing")
      if (!response.ok) {
        toast.error("Something went wrong");
        return;
      }

      const data = await response.json();
      console.log(data)
      const bubble = data[0].bubbles;
      console.log(bubble)
      setBubbles(bubble);
    } catch (error) {
      toast.error("Failed to fetch data from backend");
    }
  };

  let formId;

  useEffect(() => {
    formId  = localStorage.getItem("formId");
    fetchResponse();
  }, []);

  


  return (
    <div className={styles.container}>
      {bubbles.map((bubble) => (
        <div key={bubble._id} className="bubble-item">
          {bubble.type === "bubbleText" && (
            <div className={styles.row}>
              <div className={styles.bubbleContainer}>
                <img src={labelIcon} alt="label" className={styles.labelIcon} />
                <div className={styles.bubble}>{bubble.value}</div>
              </div>
            </div>
          )}

          {bubble.type === "bubbleImage" && (
            <div className={styles.row}>
              <div className={styles.bubbleContainer}>
                <img
                  src={bubble.value}
                  alt="Bubble Image"
                  className={styles.bubbleImage}
                />
              </div>
            </div>
          )}

          {bubble.type === "text" && (
            <div className={styles.inputContainer}>
              <div className={styles.inputForm}>
                <input
                  className={styles.input}
                  type="text"
                  name="inputField"
                  placeholder={bubble.value}
                  required
                />
                <button type="submit" className={styles.sendButton}>
                  <img src={sendIcon} alt="send" className={styles.sendIcon} />
                </button>
              </div>
            </div>
          )}

          {bubble.type === "email" && (
            <div className={styles.inputContainer}>
              <div className={styles.inputForm}>
                <input
                  className={styles.input}
                  type="email"
                  name="inputField"
                  placeholder={bubble.value}
                  required
                />
                <button type="submit" className={styles.sendButton}>
                  <img src={sendIcon} alt="send" className={styles.sendIcon} />
                </button>
              </div>
            </div>
          )}

          {bubble.type === "number" && (
            <div className={styles.inputContainer}>
              <div className={styles.inputForm}>
                <input
                  className={styles.input}
                  type="number"
                  name="inputField"
                  placeholder={bubble.value}
                  required
                />
                <button type="submit" className={styles.sendButton}>
                  <img src={sendIcon} alt="send" className={styles.sendIcon} />
                </button>
              </div>
            </div>
          )}

          {
            bubble.type === "phone" && (
              <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <input
                className={styles.input}
                type="number"
                name="inputField"
                placeholder="Mobile number"
                required
              />
              <button type="submit" className={styles.sendButton}>
                <img src={sendIcon} alt="send" className={styles.sendIcon} />
              </button>
            </div>
          </div>
            )
          }

          {
            bubble.type === "date" && (
              <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <input
                className={styles.input}
                type="date"
                name="inputField"
                placeholder="Enter your name"
                required
              />
              <button type="submit" className={styles.sendButton}>
                <img src={sendIcon} alt="send" className={styles.sendIcon} />
              </button>
            </div>
          </div>
            )
          }

          {
            bubble.type === "submitButton" && (
              <div className={styles.inputContainer}>
            <button type="submit" className={styles.sendButton}>
              Submit
            </button>
          </div>
            )
          }

          

          

          

          {/* <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
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
            </div>
          </div> */}

          
        </div>
      ))}

    </div>
  );
};

export default UserForm;

// import React, { useState } from "react";
// import sendIcon from "../../assets/send.png";
// import labelIcon from "../../assets/label-icon.png";
// import useTheme from "../../contexts/Theme";
// import styles from "./form.module.css";

// const UserForm = () => {
//   const { themeMode } = useTheme();
//   const [step, setStep] = useState(1);
//   const [responses, setResponses] = useState({
//     name: "",
//     age: "",
//     city: "",
//     hobby: "",
//   });

//   const bubbles = {
//     bubbles: [
//       {
//         type: "bubbleText",
//         value: "Hello, what's your name?",
//         _id: "1",
//       },
//       {
//         type: "text",
//         value: "Enter your name",
//         _id: "2",
//       },
//       {
//         type: "bubbleText",
//         value: "How old are you?",
//         _id: "3",
//       },
//       {
//         type: "text",
//         value: "Enter your age",
//         _id: "4",
//       },
//       {
//         type: "bubbleText",
//         value: "Where are you from?",
//         _id: "5",
//       },
//       {
//         type: "text",
//         value: "Enter your city",
//         _id: "6",
//       },
//       {
//         type: "bubbleText",
//         value: "What is your favorite hobby?",
//         _id: "7",
//       },
//       {
//         type: "text",
//         value: "Enter your hobby",
//         _id: "8",
//       },
//     ],
//   };

//   const handleSubmit = (event, field) => {
//     event.preventDefault();
//     const value = event.target.elements.inputField.value;

//     setResponses({
//       ...responses,
//       [field]: value,
//     });

//     setStep(step + 1);
//     event.target.reset(); // Clear the input field
//   };

//   return (
//     <div className={styles.container}>
//       {/* Loop through bubbles and display */}
//       {bubbles.bubbles.map((bubble, index) => {
//         // Display bubbleText type as a message
//         if (bubble.type === "bubbleText") {
//           return (
//             <div key={bubble._id} className={styles.row}>
//               <div className={styles.bubbleContainer}>
//                 <img src={labelIcon} alt="label" className={styles.labelIcon} />
//                 <div className={styles.bubble}>{bubble.value}</div>
//               </div>
//             </div>
//           );
//         }

//         // Display input field if the type is text
//         if (bubble.type === "text") {
//           return (
//             <div key={bubble._id} className={styles.row}>
//               <div className={styles.inputContainer}>
//                 <form
//                   onSubmit={(e) => handleSubmit(e, bubble.value.toLowerCase())}
//                   className={styles.inputForm}
//                 >
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="inputField"
//                     placeholder={bubble.value}
//                     required
//                   />
//                   <button type="submit" className={styles.sendButton}>
//                     <img src={sendIcon} alt="send" className={styles.sendIcon} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           );
//         }

//         return null; // In case of any other types (like bubbleImage, number, etc.)
//       })}
//     </div>
//   );
// };

// export default UserForm;

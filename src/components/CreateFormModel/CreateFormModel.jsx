import React from 'react'
import styles from "./form.module.css"

const CreateFormModel = ({showFormModal}) => {
    const createFrom = (e) => {
        e.preventDefault();
        showFormModal();
    }
  return (
   <div className={styles.overlay}>
         <div className={styles.container}>
           <h1 className={styles.title}>Create New Form</h1>
           <form>
               <input 
               type="text" 
               placeholder="Enter folder name"
               className={styles.folderInput}
               />
               <div className={styles.btnWrapper}>
                   <button
                    className={styles.createBtn}
                    onClick={createFrom}
                    >
                    Done
                    </button>
                   <div className={styles.divider}></div>
                   <button 
                   className={styles.cancelBtn}
                   onClick={showFormModal}
                   >
                   Cancel
   
                   </button>
               </div>
           </form>
         </div>
       </div>
  )
}

export default CreateFormModel
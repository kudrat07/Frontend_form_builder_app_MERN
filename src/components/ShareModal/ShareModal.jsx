import React from 'react'
import styles from "./shareModal.module.css"

const ShareModal = ({showShareModal}) => {
  return (
    <>
        <div 
        onClick={showShareModal}
        className={styles.modal}
        ></div>
        <div className={styles.overlay}>
        <div className={styles.modalContent}>
        <div className={styles.headerWrapper}>
            <h2 className={styles.heading}>Invite by Email</h2>
            <select className={styles.select}>
                <option className={styles.option}>Edit</option>
                <option className={styles.option}>View</option>
            </select>   
        </div>
        <div className={styles.inputWrapper}>
        <input 
        className={styles.input}
        type="email"
         placeholder='Enter email id'
         />
        <button className={styles.btn}>Send Invite</button>
        </div>

        <div className={styles.footerWrapper}>
            <h2 className={`${styles.heading} ${styles.linkHeading}`}>
                Invite by link
            </h2>
            <button className={styles.btn}>Copy link</button>
        </div>

        </div>
        </div>
    </>
  )
}

export default ShareModal
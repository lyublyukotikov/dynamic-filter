import React from "react";
import styles from "./ModalButton.module.scss";

const ModalButton = ({ closeModal }) => {
  return (
    <div className={styles.wrapper}>
      <a className={styles.button__blue_modal} onClick={closeModal}>
        Смотреть квартиры
      </a>
    </div>
  );
};

export default ModalButton;

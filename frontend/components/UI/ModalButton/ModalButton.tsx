import React from "react";
import styles from "./ModalButton.module.scss";

const ModalButton = () => {
  return (
    <div className={styles.wrapper}>
      <a className={styles.button__blue_modal}>Смотреть квартиры</a>
    </div>
  );
};

export default ModalButton;
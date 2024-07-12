import React from 'react';
import styles from './ModalButton.module.scss';

interface ModalButtonProps {
  closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ closeModal }) => (
  <div className={styles.wrapper}>
    <button
      type="button"
      className={styles.button__blue_modal}
      onClick={closeModal}
    >
      Смотреть квартиры
    </button>
  </div>
);

export default ModalButton;

import React from "react";
import PriceRangeSelector from "../PriceRangeSelector/PriceRangeSelector";
import SquareRangeSelector from "../SquareRangeSelector/SquareRangeSelector";
import ModalButton from "@/components/UI/ModalButton/ModalButton";
import SelectProject from "../SelectProject/SelectProject";
import RoomSelector from "../RoomSelector/RoomSelector";
import styles from "./ModalWindow.module.scss";
import Image from "next/image";
import { HeaderFormProps } from "@/app/models/HeaderFormProps/HeaderFormProps";

const ModalWindow: React.FC<HeaderFormProps> = ({ closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className={styles.modalWindow}>
      <div className={`${styles.modalWindow__inner} container`}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={handleCloseModal}>
            <Image
              width={30}
              height={30}
              src="/img/close.svg"
              alt="close button"
            />
            <span className="visually-hidden">Close navigation menu</span>
          </button>
        </div>

        <h2 className={styles.headerTitleModal}>Фильтр</h2>

        <form className={styles.modalWindowForm}>
          <SelectProject />
          <div className={styles.projectFormRoomNumbersModal}>
            <RoomSelector />
          </div>
          <div className={styles.priceRangeSelectorWrapper}>
            <PriceRangeSelector />
          </div>
          <div className={styles.priceRangeSelectorWrapper}>
            <SquareRangeSelector />
          </div>
        </form>
        <ModalButton closeModal={handleCloseModal} />
      </div>
    </div>
  );
};

export default ModalWindow;

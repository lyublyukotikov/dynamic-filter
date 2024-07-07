import React from "react";
import styles from "./BlueButtonFilter.module.scss";

const BlueButtonFilter = ({ openDrawer }: { openDrawer: () => void }) => {
  const handleClick = () => {
    openDrawer();
  };

  return (
    <div className={styles.wrapper}>
      <a className={styles.buttonBlueFilter} onClick={handleClick}>
        Фильтр
        <img width={10} height={12} src="img/filter.svg" alt="filter icon" />
      </a>
    </div>
  );
};

export default BlueButtonFilter;

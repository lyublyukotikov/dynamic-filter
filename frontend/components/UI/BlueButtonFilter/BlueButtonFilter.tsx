import React from 'react';
import Image from 'next/image';
import styles from './BlueButtonFilter.module.scss';

interface BlueButtonFilterProps {
  openDrawer: () => void;
}

const BlueButtonFilter: React.FC<BlueButtonFilterProps> = ({ openDrawer }) => {
  const handleClick = () => {
    openDrawer();
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.buttonBlueFilter} onClick={handleClick} type="button">
        Фильтр
        <Image width={10} height={12} src="/img/filter.svg" alt="filter icon" />
      </button>
    </div>
  );
};

export default BlueButtonFilter;

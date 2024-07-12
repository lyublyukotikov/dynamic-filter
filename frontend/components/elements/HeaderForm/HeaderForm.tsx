import React, { useState, useEffect } from 'react';
import BlueButtonFilter from '@/components/UI/BlueButtonFilter/BlueButtonFilter';
import { HeaderFormProps } from '@/app/models/HeaderFormProps/HeaderFormProps';
import SelectProject from '../SelectProject/SelectProject';
import RoomSelector from '../RoomSelector/RoomSelector';
import PriceRangeSelector from '../PriceRangeSelector/PriceRangeSelector';
import SquareRangeSelector from '../SquareRangeSelector/SquareRangeSelector';
import SearchResult from '../SearchRezult/SearchRezult';
import styles from './HeaderForm.module.scss';

const HeaderForm: React.FC<HeaderFormProps> = ({ openDrawer }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__inner} container`}>
        <h2 className={styles.header__title}>Планировки</h2>
        <form className={styles.projectForm}>
          <div className={`${styles.projectForm__group}`}>
            <SelectProject />
            <RoomSelector />
          </div>
          <div className={`${styles.projectForm__group}`}>
            <PriceRangeSelector />
            <SquareRangeSelector />
          </div>
        </form>
        {isMobile && <BlueButtonFilter openDrawer={openDrawer} />}
        <SearchResult />
      </div>
    </header>
  );
};

export default HeaderForm;

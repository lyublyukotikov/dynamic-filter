import React from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/storeContext/StoreContext';
import styles from './SearchRezult.module.scss';

const SearchResult = observer(() => {
  const store = useStore();

  const totalFlats = store.flats?.meta?.total || 0;

  const handleClearFilters = () => {
    store.clearFilters();
  };

  return (
    <div className={styles.searchResult}>
      <div className={styles.searchResult__number}>
        Найдено
        {' '}
        {totalFlats}
        {' '}
        квартир
      </div>
      <div className={styles.searchResult__clear}>
        <button className={styles.searchResult__button} onClick={handleClearFilters} type="button">
          <Image
            src="/img/arrow.svg"
            alt="clear everything"
            width={24}
            height={24}
          />
          Очистить все
        </button>
      </div>
    </div>
  );
});

export default SearchResult;

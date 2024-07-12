import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/storeContext/StoreContext';
import ContentLoader from 'react-content-loader';
import styles from './BlueButton.module.scss';

const BlueButton: React.FC = observer(() => {
  const store = useStore();
  const { isLoading } = store;

  // Текущая страница
  const currentPage = store.flats?.meta.current_page ?? 1;
  // Последняя страница
  const lastPage = store.flats?.meta.last_page ?? 1;
  // Следующая страница
  const nextPage = currentPage + 1;

  const buttonText = `Показать еще ${nextPage} из ${lastPage}`;

  const loadMoreFlats = () => {
    if (currentPage < lastPage) {
      store.fetchFlats(nextPage);
    }
  };

  // Проверяем, есть ли следующая страница
  const hasNextPage = nextPage <= lastPage;

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <ContentLoader
            speed={2}
            width="100%"
            height="58px"
            viewBox="0 0 580 58"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="58px" />
          </ContentLoader>
        </div>
      ) : (
        hasNextPage && (
          <button
            type="button"
            onClick={loadMoreFlats}
            className={styles.buttonBlue}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                loadMoreFlats();
              }
            }}
          >
            {buttonText}
          </button>
        )
      )}
    </div>
  );
});

export default BlueButton;

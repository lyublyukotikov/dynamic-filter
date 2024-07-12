/* eslint-disable */

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/storeContext/StoreContext';
import ContentLoader from 'react-content-loader';
import styles from './RoomSelector.module.scss';

const RoomSelector = observer(() => {
  const store = useStore();
  // получаем фильтры комнат
  const rooms = store.filters?.data?.rooms || [];
  const { isLoading } = store;
  // храним выбранные фильтры
  const { selectedRoom } = store;

  useEffect(() => {
    // создаем новый объект, используя строку запроса из текущего url
    const params = new URLSearchParams(window.location.search);
    // извлекаем все значения params и преобразуем из строки в число
    const roomsParam = params.getAll('f[rooms][]').map(Number);
    // если есть, передаем в метод добавления в фильтр
    if (roomsParam.length > 0) {
      store.setSelectedRoom(roomsParam);
      store.applyFilter({ rooms: roomsParam });
    }
  }, [store]);

  useEffect(() => {
    if (store.filters?.data.rooms) {
      const validRooms = store.filters.data.rooms.map((room) => room.number);
      store.setSelectedRoom(
        selectedRoom.filter((room) => validRooms.includes(room))
      );
    }
   
  }, [store.filters?.data.rooms]);

  // клик на кнопки
  const handleButtonClick = (roomNumber: number) => {
    // проверяем есть ли комната в списке уже выбранных комнат
    const newSelectedRoom = selectedRoom.includes(roomNumber)
      ? // если есть, то новый список формируем, удаляя повторяющиеся элементы
        selectedRoom.filter((num) => num !== roomNumber)
      : // иначе добавляем к текущему массиву новые значения roomNumber
        [...selectedRoom, roomNumber];
    // обновляем стейт selectedRoom
    store.setSelectedRoom(newSelectedRoom);
    // метод добавления в фильтр
    store.applyFilter({ rooms: newSelectedRoom });
    // вызываем метод обновления ссылки в браузере
    store.updateURL();
  };

  return (
    <div className={styles.projectForm__roomNumbers}>
      <label
        className={styles.projectForm__roomNumbers__Label}
        htmlFor="room-select"
      >
        Укажите количество комнат
      </label>

      {isLoading ? (
        <ul className={styles.projectForm__roomNumbers__List}>
          {[...Array(5)].map((_, index) => (
            <li key={index} className={styles.projectForm__roomNumbersItem}>
              <ContentLoader
                speed={2}
                width={71}
                height={55}
                viewBox="0 0 71 55"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="10" ry="10" width="71" height="55" />
              </ContentLoader>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.projectForm__roomNumbers__List}>
          {rooms.map((room, index) => (
            <li
              key={room.number}
              className={styles.projectForm__roomNumbersItem}
            >
              <button
                className={`${styles.projectForm__roomNumbers__Button} button ${
                  // если выбранные фильтры содержат номер кнопки, то красим, иначе - не красим
                  selectedRoom.includes(room.number) ? styles.selected : ''
                }`}
                type="button"
                // передаем при клике номер фильтра
                onClick={() => handleButtonClick(room.number)}
                // отображаем кнопку, если она доступна на API
                disabled={room.disabled}
              >
                {/* выводим номера */}
                {index === 0 ? 'Ст' : `${room.number}k`}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default RoomSelector;

/* eslint-disable */

import React, { useState, useEffect } from 'react'; 
import { observer } from 'mobx-react-lite';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ContentLoader from 'react-content-loader';
import Image from 'next/image';
import { useStore } from '@/app/storeContext/StoreContext';
import styles from './PriceRangeSelector.module.scss';

const PriceRangeSelector = observer(() => {
  const store = useStore();
  const price = store.filters?.data?.price || {
    min: 0,
    max: 0,
    min_range: 0,
    max_range: 0,
  };
  const { isLoading } = store;

  // по умолчанию
  const initialMin = price.min === 0 ? price.min_range : price.min;
  const initialMax = price.max === 0 ? price.max_range : price.max;

  const [priceRange, setPriceRange] = useState<number[]>([initialMin, initialMax]);

  // чтобы фильтр не схлопывался если приходит значение максимальное и минимальное равное 0 тогда ставим  в priceRange  price.min_range и  price.max_range
  useEffect(() => {
    const newMin = price.min === 0 ? price.min_range : price.min;
    const newMax = price.max === 0 ? price.max_range : price.max;
    setPriceRange([newMin, newMax]);
  }, [price.min, price.max, price.min_range, price.max_range]);

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
    store.applyFilter({ price: newRange });
    store.updateURL();
  };

  const formatPrice = (value: number) => (value?.toLocaleString() || '0');

  return (
    <div className={styles.priceRangeSelector}>
      <label className={styles.priceRangeSelector__label} htmlFor="priceRangeInput">
        Стоимость
      </label>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width="100%"
          height="55px"
          viewBox="0 0 430 55"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="430" height="55" />
        </ContentLoader>
      ) : (
        <div className={styles.priceRangeSelector__container}>
          <div className={styles.priceRangeSelector__values}>
            <div className={styles.priceRangeSelector__value}>
              от{' '}
              <span className={styles.priceRangeSelector__valueNumber}>
                {formatPrice(priceRange[0])}
                ₽
              </span>
            </div>
            <Image
              className={styles.priceRangeSelector__line}
              src="/img/line.svg"
              alt="line"
              width={100}
              height={2}
            />
            <div className={styles.priceRangeSelector__value}>
              до{' '}
              <span className={styles.priceRangeSelector__valueNumber}>
                {formatPrice(priceRange[1])}
                ₽
              </span>
            </div>
          </div>
          <Slider
            min={price.min_range}
            max={price.max_range}
            step={1}
            range
            value={priceRange}
            onChange={handlePriceChange}
            className={styles.priceRangeSelector__slider}
            trackStyle={{ backgroundColor: '#2495FE' }}
            railStyle={{ backgroundColor: 'transparent' }}
            handleStyle={{
              borderColor: '#2495FE',
              backgroundColor: '#2495FE',
            }}
            id="priceRangeInput"
          />
        </div>
      )}
    </div>
  );
});

export default PriceRangeSelector;

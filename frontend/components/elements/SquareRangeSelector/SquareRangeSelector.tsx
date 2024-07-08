"use client";

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Slider from "rc-slider";
import styles from "../PriceRangeSelector/PriceRangeSelector.module.scss";
import "rc-slider/assets/index.css";
import { useStore } from "@/app/storeContext/StoreContext";
import Image from "next/image";
import ContentLoader from "react-content-loader";

const SquareRangeSelector = observer(() => {
  const store = useStore();
  const square = store.filters?.data?.square || {
    min: 0,
    max: 0,
    min_range: 0,
    max_range: 0,
  };
  const isLoading = store.isLoading;

  const initialMin = square.min === 0 ? square.min_range : square.min;
  const initialMax = square.max === 0 ? square.max_range : square.max;

  const [squareRange, setSquareRange] = useState([initialMin, initialMax]);

  useEffect(() => {
    const newMin = square.min === 0 ? square.min_range : square.min;
    const newMax = square.max === 0 ? square.max_range : square.max;
    setSquareRange([newMin, newMax]);
  }, [square.min, square.max, square.min_range, square.max_range]);

  const handleSquareChange = (newRange: number[]) => {
    setSquareRange(newRange);
    store.applyFilter({ square: newRange });
    store.updateURL();
  };

  const formatSquare = (value: number) => {
    return value?.toLocaleString() || "0";
  };

  useEffect(() => {
    if (Object.keys(store.selectedFilters).length === 0) {
      setSquareRange([initialMin, initialMax]);
    }
  }, [store.selectedFilters, initialMin, initialMax]);

  return (
    <div className={styles.priceRangeSelector}>
      <label className={styles.priceRangeSelector__label}>Задайте площадь, м²</label>
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
              от{" "}
              <span className={styles.priceRangeSelector__valueNumber}>
                {formatSquare(squareRange[0])} 
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
              до{" "}
              <span className={styles.priceRangeSelector__valueNumber}>
                {formatSquare(squareRange[1])} 
              </span>
            </div>
          </div>
          <Slider
            min={square.min_range}
            max={square.max_range}
            step={1}
            range
            value={squareRange}
            onChange={handleSquareChange}
            className={styles.priceRangeSelector__slider}
            trackStyle={{ backgroundColor: "#2495FE" }}
            railStyle={{ backgroundColor: "transparent" }}
            handleStyle={{
              borderColor: "#2495FE",
              backgroundColor: "#2495FE",
            }}
          />
        </div>
      )}
    </div>
  );
});

export default SquareRangeSelector;

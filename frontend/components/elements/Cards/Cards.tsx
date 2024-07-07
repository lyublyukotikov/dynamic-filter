"use client";
import React from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/storeContext/StoreContext";
import ContentLoader from "react-content-loader";

const Cards = observer(() => {
  const store = useStore();
  const flats = store.flats?.data || [];
  const isLoading = store.isLoading;

  return (
    <div className={styles.cards}>
      <h2 className="visually-hidden">Card with info about Object</h2>
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              width="100%"
              height="100%"
              viewBox="0 0 580 642"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              style={{ width: '100%', height: '100%' }}
            >
              <rect x="1" y="-2" rx="10" ry="10" width="580" height="642" />
            </ContentLoader>
          ))
        : flats.map((flat) => (
            <Card key={flat.id} flat={flat} />
          ))}
    </div>
  );
});

export default Cards;

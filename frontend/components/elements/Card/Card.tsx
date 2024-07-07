import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import { CardProps } from "@/app/models/Flats/CardProps";
import ContentLoader from "react-content-loader";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/storeContext/StoreContext";

const Card: React.FC<CardProps> = observer(({ flat }) => {
  const store = useStore();
  const isLoading = store.isLoadingCard;

  const formatPrice = (price: string) => {
    return `${Number(price).toLocaleString("ru-RU").replace(/,/g, " ")} ₽`;
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <ContentLoader
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
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.card__body}>
            <div className={styles.card__info}>
              <p className={styles.card__title}>
                {flat.rooms}-комнатная {flat.square} м²
              </p>
              <div className={styles.card__price}>
                {formatPrice(flat.price)}
                {flat.old_price && (
                  <span className={styles.card__crossedOutPrice}>
                    {formatPrice(flat.old_price)}
                  </span>
                )}
              </div>
            </div>
            <button
              className={styles.card__favoriteButton}
              aria-label="Add to favorites"
            >
              <Image
                className={styles.card__favoriteIcon}
                src="/img/like.svg"
                alt="heart icon"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className={styles.card__image__wrapper}>
            <Image
              className={styles.card__image}
              alt={`${flat.project_title} project`}
              width={166}
              height={288}
              src={flat.image}
              objectFit="cover"
            />
          </div>
          <ul className={styles.card__descriptionList}>
            <li className={styles.card__descriptionItem}>
              <p className={styles.card__descriptionItem__label}>Проект:</p>
              <span className={styles.card__descriptionItem__value}>
                {flat.project_title}
              </span>
            </li>
            <li className={styles.card__descriptionItem}>
              <p className={styles.card__descriptionItem__label}>Этаж:</p>
              <span className={styles.card__descriptionItem__value}>
                {flat.floor}
              </span>
            </li>
            <li className={styles.card__descriptionItem}>
              <p className={styles.card__descriptionItem__label}>Срок сдачи:</p>
              <span className={styles.card__descriptionItem__value}>
                {flat.release_dates}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
});

export default Card;

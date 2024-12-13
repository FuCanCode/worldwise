import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CityProps } from "../../../data/types";
import { useCities } from "../../hooks/useCities";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: { city: CityProps }) {
  const { currentCity, deleteCity } = useCities();

  const {
    id,
    cityName,
    date,
    emoji,
    position: { lat, lng },
  } = city;

  const isCurrentCity = currentCity?.id === id;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    await deleteCity(id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          isCurrentCity ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date} dateTime={date.toString()}>
          {formatDate(date)}
        </time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          x
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

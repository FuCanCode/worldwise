import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import { useCities } from "../../hooks/useCities";
import { useEffect } from "react";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { currentCity, getCity, isLoading } = useCities();
  const { id } = useParams();

  useEffect(() => {
    getCity(Number(id));
  }, [id]);

  if (isLoading) return <Spinner />;

  if (!currentCity) return <h1>City not found ;(</h1>;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date) || null}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type={"back"}>Back</Button>
      </div>
    </div>
  );
}

export default City;

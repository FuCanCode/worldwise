import { useEffect, useState } from "react";
import { useURLPosition } from "../../hooks/useURLPosition";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { CityProps, GeocodingObject } from "../../../data/types";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../hooks/useCities";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

const GEOCODING_BASE_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const { createCity, isLoading } = useCities();

  const { lat, lng } = useURLPosition();

  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;
    async function getClosestPLace() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");

        const res = await fetch(
          `${GEOCODING_BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data: GeocodingObject = await res.json();
        const { city, locality, countryName, countryCode } = data;

        if (!countryCode)
          throw new Error(
            "Ooops, seems you took a visit to the ocean. Is there a city beneath it?"
          );

        setCityName(city || locality || "");
        setCountry(countryName);
        setEmoji(convertToEmoji(countryCode) || "");
      } catch (error) {
        setGeoCodingError(
          error instanceof Error ? error.message : "API did not work!"
        );
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    getClosestPLace();
  }, [lat, lng]);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: Omit<CityProps, "id"> = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat || !lng)
    return <Message message={"Start by clicking on the map!"} />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date ? date : new Date())}
          dateFormat={"d. MMMM yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back">&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;

import CityItem from "../CityItem/CityItem";
import styles from "./CityList.module.css";
import { CityProps } from "../../../data/types";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCities } from "../../hooks/useCities";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Start by adding cities from the map!" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city: CityProps) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;

import { useEffect, useState } from "react";
import { BASE_URL } from "../appConfig";
import { CityProps } from "../../data/types";
import { useParams } from "react-router-dom";

export function useCity() {
  const [city, setCity] = useState<CityProps>();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getCity() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities/${id}`);

        const city: CityProps = await res.json();

        setCity(city);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong :(";

        throw Error(message);
      } finally {
        setIsLoading(false);
      }
    }
    getCity();
  }, [id]);

  return { city, isLoading };
}

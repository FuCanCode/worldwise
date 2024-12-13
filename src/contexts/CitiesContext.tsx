import { useEffect, createContext, ReactNode, useReducer } from "react";
import { CityProps } from "../../data/types";

import { BASE_URL } from "../appConfig";
import { appReducer, AppState } from "../reducer/app-reducer";

interface ICitiesContext extends AppState {
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: Omit<CityProps, "id">) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

export const CitiesContext = createContext<ICitiesContext | null>(null);

const initialState: AppState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

export function CitiesContextProvider({ children }: { children: ReactNode }) {
  // const [cities, setCities] = useState<CityProps[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState<CityProps | null>(null);

  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    appReducer,
    initialState
  );

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`);

      const cities: CityProps[] = await res.json();

      dispatch({ type: "cities/loaded", cities });
    } catch (error) {
      dispatch({
        type: "rejected",
        errMsg:
          error instanceof Error
            ? error.message
            : "Something went wrong on fetching the cities ;(",
      });
    }
  }

  async function getCity(id: number) {
    if (id === currentCity?.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const city: CityProps = await res.json();

      dispatch({ type: "city/loaded", currentCity: city });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong trying to fetch the city data :(";

      dispatch({ type: "rejected", errMsg: message });
    }
  }

  async function createCity(newCity: Omit<CityProps, "id">) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: CityProps = await res.json();
      dispatch({ type: "cities/cityAdded", newCity: data });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong trying to add the city :(";

      dispatch({ type: "rejected", errMsg: message });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/cityDeleted", id });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "There was an Error deleting the city";

      dispatch({ type: "rejected", errMsg: message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesContext;

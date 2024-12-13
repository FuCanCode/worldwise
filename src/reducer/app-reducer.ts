import { CityProps } from "../../data/types";

export interface AppState {
  cities: CityProps[];
  isLoading: boolean;
  currentCity: CityProps | null;
  error: string;
}

type AppAction =
  | { type: "loading" }
  | { type: "rejected"; errMsg: string }
  | { type: "cities/loaded"; cities: CityProps[] }
  | { type: "cities/cityAdded"; newCity: CityProps }
  | { type: "cities/cityDeleted"; id: number }
  | { type: "city/loaded"; currentCity: CityProps };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "rejected": {
      return { ...state, isLoading: false, error: action.errMsg };
    }

    case "cities/cityAdded":
      return {
        ...state,
        cities: [action.newCity, ...state.cities],
        isLoading: false,
        currentCity: action.newCity,
      };

    case "cities/loaded":
      return { ...state, cities: action.cities, isLoading: false };

    case "cities/cityDeleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.id),
        isLoading: false,
        currentCity: null,
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.currentCity,
        isLoading: false,
      };

    default:
      throw Error("No such reducer type!");
  }
}

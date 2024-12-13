import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export function useCities() {
  const cityContextValue = useContext(CitiesContext);
  if (!cityContextValue) throw Error("No access to context provider!");
  return cityContextValue;
}

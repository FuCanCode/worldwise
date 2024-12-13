import { useContext } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw Error("No access to context provider!");

  return context;
}

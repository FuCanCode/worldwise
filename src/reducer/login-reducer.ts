import { User } from "../../data/types";

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  authError: string;
}

type AuthAction =
  | { type: "auth/loggedIn"; user: User }
  | { type: "auth/loggedOut" }
  | { type: "auth/failed"; reason: string };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "auth/loggedIn":
      return {
        ...state,
        authError: "",
        isLoggedIn: true,
        user: action.user,
      };

    case "auth/loggedOut":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case "auth/failed":
      return {
        ...state,
        authError: action.reason,
      };

    default:
      throw Error("No such reducer action defined");
  }
}

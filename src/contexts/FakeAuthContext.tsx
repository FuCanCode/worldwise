import { createContext, ReactNode, useReducer } from "react";
import { authReducer, AuthState } from "../reducer/login-reducer";
import { FAKE_USER } from "../../data/fake-user";

interface IAuthContext extends AuthState {
  login: (userName: string, passwotrd: string) => void;
  authError: string;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  authError: "",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ isLoggedIn, user, authError }, dispatch] = useReducer(
    authReducer,
    initialAuthState
  );

  function login(userName: string, password: string): void {
    const { email: correctUserName, password: correctPassword } = FAKE_USER;

    if (userName !== correctUserName)
      dispatch({ type: "auth/failed", reason: "No such user name." });

    if (password !== correctPassword)
      dispatch({ type: "auth/failed", reason: "The password is wrong." });

    if (userName === correctUserName && password === correctPassword) {
      dispatch({ type: "auth/loggedIn", user: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "auth/loggedOut" });
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, authError, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

const savedUser = () => {
  try { return JSON.parse(localStorage.getItem("bulldogs_user")); } catch { return null; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(savedUser);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("bulldogs_token")));

  const setSession = (payload) => {
    const token = payload.token || payload.accessToken;
    const sessionUser = payload.user || payload.account || payload;
    if (!token) throw new Error("The server did not return a JWT token.");
    localStorage.setItem("bulldogs_token", token);
    localStorage.setItem("bulldogs_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  useEffect(() => {
    if (!localStorage.getItem("bulldogs_token")) return undefined;
    api.me().then((currentUser) => {
      localStorage.setItem("bulldogs_user", JSON.stringify(currentUser));
      setUser(currentUser);
    }).catch(() => {
      localStorage.removeItem("bulldogs_token"); localStorage.removeItem("bulldogs_user"); setUser(null);
    }).finally(() => setLoading(false));
    return undefined;
  }, []);

  const login = async (credentials) => setSession(await api.login(credentials));
  const register = async (details) => setSession(await api.register(details));
  const logout = () => { localStorage.removeItem("bulldogs_token"); localStorage.removeItem("bulldogs_user"); setUser(null); };
  const refreshUser = async () => { const currentUser = await api.me(); localStorage.setItem("bulldogs_user", JSON.stringify(currentUser)); setUser(currentUser); };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

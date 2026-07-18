import { createContext, useContext, useState } from "react";
import { storage } from "../services/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get("auth_user", null));

  const login = (userData) => {
    storage.set("auth_user", userData);
    setUser(userData);
  };

  const logout = () => {
    storage.remove("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

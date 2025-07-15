"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

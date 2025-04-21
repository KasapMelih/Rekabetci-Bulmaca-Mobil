import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/services/api";

type User = { id: number; userName: string; points: number };
type AuthCtx = {
  user?: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({} as AuthCtx);
export const useAuth = () => useContext(Ctx);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();

  // token varsa kullanıcıyı getir
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const me = await api.get<User>("/auth/me");
        setUser(me.data);
      } else {
        setUser(null);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post<{ token: string }>("/auth/login", {
      email,
      password,
    });
    await SecureStore.setItemAsync("token", data.token);
    const me = await api.get<User>("/auth/me");
    setUser(me.data);
  };

  const register = async (form: {
    email: string;
    password: string;
    fullName: string;
    userName: string;
  }) => {
    await api.post("/auth/register", form);
    await login(form.email, form.password); // otomatik giriş
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
};

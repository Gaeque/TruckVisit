import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "../storage/storageUser";
import { AppError } from "../utils/AppError/AppError";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

export type AuthContextDataProps = {
  user: UserDTO;
  gKey: string | null;
  phone: string | null;
  signIn: (
    userId: string,
    password: string,
    navigation: AuthNavigatorRoutesProps
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({ authN4: false } as UserDTO);
  const [phone, setPhone] = useState<string | null>(null);
  const [gKey, setGKey] = useState<string | null>(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function signIn(
    userId: string,
    password: string,
    navigation: AuthNavigatorRoutesProps
  ) {
    try {
      const { data } = await api.post("/api-app-truckvisit/auth/login", {
        userId,
        password,
      });
      if (data.authN4) {
        if (data.driverExpired) {
          navigation.navigate("ConfirmPassword", {
            userName: data.userName,
            userCPF: data.userCPF,
            userGkey: data.userGkey,
          });
          return;
        }
        if (!data.driverLocked) {
          setUser(data);
          const userWithGKey = { ...data, userGkey: data.userGkey };
          await storageUserSave(userWithGKey);
          setGKey(data.userGkey);
          setPhone(data.phone || "");
        } else {
          throw new AppError(
            "Usuário bloqueado. Entre em contato com o suporte."
          );
        }
      } else {
        throw new AppError("CPF ou Senha Incorretos.");
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      setGKey(null);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();
      if (userLogged) {
        setUser(userLogged);
        setGKey(userLogged.userGkey || null);
        setPhone(userLogged.phone || " ");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, gKey, phone, signIn, signOut, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

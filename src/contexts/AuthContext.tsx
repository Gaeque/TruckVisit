import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "../storage/storageUser";
import { AppError } from "../utils/AppError/AppError";

export type AuthContextDataProps = {
  user: UserDTO;
  gKey: string | null;
  signIn: (userId: string, password: string) => Promise<void>;
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
  const [gKey, setGKey] = useState<string | null>(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function signIn(userId: string, password: string) {
    try {
      const { data } = await api.post("/api-app-truckvisit/auth/login", {
        userId,
        password,
      });
      if (data.authN4) {
        setUser(data);
        const userWithGKey = { ...data, userGkey: data.userGkey };
        await storageUserSave(userWithGKey);
        const gKeyFromResponse = data.userGkey;
        setGKey(gKeyFromResponse);
      } else {
        throw new AppError("Autenticação falhou");
      }
    } catch (error) {
      throw error;
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
      value={{ user, gKey, signIn, signOut, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

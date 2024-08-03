"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "../app/types/index";
import { getCurrentUser } from "../app/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  followers: 0,
  following: 0,
  notifications: 0,
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: User;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
          followers: currentAccount.followers,
          following: currentAccount.following,
          notifications: currentAccount.notifications,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const authToken = localStorage.getItem(
        process.env.NEXT_PUBLIC_APPWRITE_COOKIE_AUTH_TOKEN_NAME
      );
      // console.log("cookie", authToken);
      if (
        authToken ===
          process.env.NEXT_PUBLIC_APPWRITE_COOKIE_AUTH_TOKEN_EMPTY ||
        authToken === process.env.NEXT_PUBLIC_APPWRITE_COOKIE_AUTH_TOKEN_NULL ||
        authToken ===
          process.env.NEXT_PUBLIC_APPWRITE_COOKIE_AUTH_TOKEN_UNDEFINED
      ) {
        router.push("/signin");
        // console.log(cookieFallback);
      }
    } catch (error) {
      console.log("error in authcontext", error);
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);

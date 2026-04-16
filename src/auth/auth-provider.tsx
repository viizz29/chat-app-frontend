import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useStorage } from "@/components/misc/local-storage-provider";

type User = {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthReady: boolean; // ✅ NEW
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // ✅ NEW
  const { get, set, remove } = useStorage();


  // 🔐 Login
  const login = (newToken: string, userData?: { id: number, username: string, role: string }) => {
    set("token", newToken);
    if (userData) {
      set("user", JSON.stringify(userData));
    }

    const decoded: User = jwtDecode(newToken);

    setToken(newToken);
    setUser(decoded);
  };

  // 🚪 Logout
  const logout = () => {
    remove("token");
    remove("user");
    setToken(null);
    setUser(null);
  };


  useEffect(() => {

    (async () => {
      const storedToken = get("token") as string;


      if (storedToken) {
        try {
          const decoded: User = jwtDecode(storedToken);

          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            remove("token");
          } else {


            setToken(storedToken);
            setUser(decoded);
          }
        } catch {
          remove("token");
        }
      }


      setIsAuthReady(true); // ✅ mark ready AFTER check


    })();

  }, []);



  return (

    isAuthReady ? <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAuthReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider> : <div>Loading ...</div>
  );
};
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (
    token: string,
    username: string,
    role: string,
    rememberMe: boolean,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in storage when app loads
    const storedToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (storedToken) {
      // In a real app, you might want to validate the token with the backend
      // or decode it to get user info if using JWT
      setToken(storedToken);
      // For demo, we'll parse role from token (adjust based on your actual token format)
      const role = storedToken.includes("ROLE_ADMIN")
        ? "ROLE_ADMIN"
        : "ROLE_USER";
      setRole(role);
    }
  }, []);

  const login = (
    newToken: string,
    newUsername: string,
    role: string,
    rememberMe: boolean,
  ) => {
    if (rememberMe) {
      localStorage.setItem("authToken", newToken);
    } else {
      sessionStorage.setItem("authToken", newToken);
    }
    setToken(newToken);
    setUsername(newUsername);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setToken(null);
    setUsername(null);
    setRole(null);
  };

  const value = {
    token,
    username,
    role,
    isAuthenticated: !!token,
    isAdmin: role === "ROLE_ADMIN",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

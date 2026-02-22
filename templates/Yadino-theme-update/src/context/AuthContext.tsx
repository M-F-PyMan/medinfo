import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  is_teacher: boolean;
  is_staff: boolean;
  date_joined: string;
  profile?: any;
  enrollments?: any[];
  instructor_courses?: any[];
}

interface AuthContextType {
  user: User | null;
  role: "student" | "instructor" | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  name?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "http://127.0.0.1:8000/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"student" | "instructor" | null>(null);
  const [loading, setLoading] = useState(true);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
  });

  // -----------------------------
  // 🔥 تعیین نقش کاربر
  // -----------------------------
  const determineRole = (userData: User | null) => {
    if (!userData) {
      setRole(null);
      return;
    }
    setRole(userData.is_teacher ? "instructor" : "student");
  };

  // -----------------------------
  // 🔥 Auto Login (me)
  // -----------------------------
  const fetchMe = async () => {
    const access = localStorage.getItem("access");
    if (!access) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/me/`, {
        headers: authHeaders(),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        determineRole(data);
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // -----------------------------
  // 🔥 Login
  // -----------------------------
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setUser(data.user);
      determineRole(data.user);

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // -----------------------------
  // 🔥 Register
  // -----------------------------
  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return res.ok;
    } catch (err) {
      console.error("Register error:", err);
      return false;
    }
  };

  // -----------------------------
  // 🔥 Logout
  // -----------------------------
  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");

      await fetch(`${API_BASE}/auth/logout/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ refresh }),
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setRole(null);
  };

  // -----------------------------
  // 🔥 Refresh User (برای بعد از تأیید مدرس شدن)
  // -----------------------------
  const refreshUser = async () => {
    await fetchMe();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

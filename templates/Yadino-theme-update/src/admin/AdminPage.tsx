// src/admin/AdminPage.tsx
import React, { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { ToastProvider } from "./components/ToastProvider";
import { login, AdminUser } from "./api/auth";
import { getToken, setToken } from "./api/client";

// سکشن‌ها
import { DashboardSection } from "./sections/DashboardSection";
import { UsersSection } from "./sections/UsersSection";
import { CoursesSection } from "./sections/CoursesSection";
import { PaymentsSection } from "./sections/PaymentsSection";
import { CartsSection } from "./sections/CartsSection";
import { RatingsSection } from "./sections/RatingsSection";
import { CommentsSection } from "./sections/CommentsSection";
import { CommentReportsSection } from "./sections/CommentReportsSection";
import { PagesSection } from "./sections/PagesSection";
import { BlogSection } from "./sections/BlogSection";
import { TicketsSection } from "./sections/TicketsSection";
import { SettingsSection } from "./sections/SettingsSection";

const AdminLogin: React.FC<{ onLogin: (user: AdminUser) => void }> = ({
  onLogin,
}) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(credentials.username, credentials.password);
      onLogin(data.user);
    } catch {
      setError("نام کاربری یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 rtl">
      <div className="glass rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            ورود به پنل مدیریت
          </h1>
          <p className="text-gray-400">لطفاً اطلاعات ورود خود را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نام کاربری / ایمیل
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glow-button py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setBootstrapped(true);
      return;
    }

    // اگر endpoint برای me داری، اینجا صدا بزن
    // فعلاً ساده:
    setCurrentUser({
      id: 1,
      username: "admin",
      email: "admin@example.com",
      role: "admin",
    });

    setBootstrapped(true);
  }, []);

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  if (!bootstrapped) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        در حال بارگذاری...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <ToastProvider>
        <AdminLogin onLogin={setCurrentUser} />
      </ToastProvider>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection currentUser={currentUser} />;
      case "users":
        return <UsersSection currentUser={currentUser} />;
      case "courses":
        return <CoursesSection currentUser={currentUser} />;
      case "payments":
        return <PaymentsSection currentUser={currentUser} />;
      case "carts":
        return <CartsSection currentUser={currentUser} />;
      case "ratings":
        return <RatingsSection currentUser={currentUser} />;
      case "comments":
        return <CommentsSection currentUser={currentUser} />;
      case "comment-reports":
        return <CommentReportsSection currentUser={currentUser} />;
      case "pages":
        return <PagesSection currentUser={currentUser} />;
      case "blog":
        return <BlogSection currentUser={currentUser} />;
      case "tickets":
        return <TicketsSection currentUser={currentUser} />;
      case "settings":
        return <SettingsSection currentUser={currentUser} />;
      default:
        return <DashboardSection currentUser={currentUser} />;
    }
  };

  return (
    <ToastProvider>
      <Layout
        activeSection={activeSection}
        onChangeSection={setActiveSection}
        onLogout={handleLogout}
        currentUser={currentUser}
      >
        {renderContent()}
      </Layout>
    </ToastProvider>
  );
};

export default AdminPage;

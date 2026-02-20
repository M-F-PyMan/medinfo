import React from "react";
import {
  Home,
  Users,
  BookOpen,
  CreditCard,
  ShoppingCart,
  Star,
  MessageSquare,
  Flag,
  FileText,
  PenTool,
  Ticket,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", name: "داشبورد", icon: Home },

  { id: "users", name: "کاربران", icon: Users },
  { id: "courses", name: "دوره‌ها", icon: BookOpen },

  { id: "payments", name: "پرداخت‌ها", icon: CreditCard },
  { id: "carts", name: "سبدهای خرید", icon: ShoppingCart },

  { id: "ratings", name: "امتیازها", icon: Star },
  { id: "comments", name: "کامنت‌ها", icon: MessageSquare },
  { id: "comment-reports", name: "گزارش کامنت‌ها", icon: Flag },

  { id: "pages", name: "صفحات", icon: FileText },
  { id: "blog", name: "وبلاگ", icon: PenTool },

  { id: "tickets", name: "تیکت‌ها", icon: Ticket },

  { id: "settings", name: "تنظیمات", icon: Settings },
];

interface Props {
  activeSection: string;
  onChangeSection: (id: string) => void;
  onLogout: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({
  activeSection,
  onChangeSection,
  onLogout,
  open,
  setOpen,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-64 glass border-l border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">پنل مدیریت</h2>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden p-1 hover:bg-white/10 rounded"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeSection(item.id)}
            className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
              activeSection === item.id
                ? "bg-purple-500/20 text-purple-400"
                : "text-gray-400 hover:text-purple-400 hover:bg-white/5"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>خروج</span>
        </button>
      </div>
    </div>
  );
};

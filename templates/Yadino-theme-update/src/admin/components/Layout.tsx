// src/admin/components/Layout.tsx
import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AdminUser } from '../api/auth.ts';

interface Props {
  children: React.ReactNode;
  activeSection: string;
  onChangeSection: (id: string) => void;
  onLogout: () => void;
  currentUser: AdminUser | null;
}

export const Layout: React.FC<Props> = ({
  children,
  activeSection,
  onChangeSection,
  onLogout,
  currentUser,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 rtl">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeSection={activeSection}
        onChangeSection={(id) => {
          onChangeSection(id);
          setSidebarOpen(false);
        }}
        onLogout={onLogout}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="lg:mr-64">
        <header className="glass border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu className="h-5 w-5 text-gray-400" />
            </button>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <p className="text-white font-medium">
                  {currentUser?.username || currentUser?.email || 'مدیر سیستم'}
                </p>
                <p className="text-gray-400 text-sm">
                  {currentUser?.role === 'admin' ? 'مدیر کل' : 'کاربر ادمین'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {(currentUser?.username || 'A')[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

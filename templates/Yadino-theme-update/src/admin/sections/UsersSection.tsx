// src/admin/sections/UsersSection.tsx
import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { listUsers, updateUserRole, User } from '../api/users';
import { Pagination } from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';
import { useToast } from '../components/ToastProvider';
import { AdminUser } from '../api/auth.ts';

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const UsersSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const canManageRoles = currentUser?.role === 'admin';

  const load = async () => {
    setLoading(true);
    try {
      const res = await listUsers({
        page,
        page_size: PAGE_SIZE,
        search,
        ordering: '-date_joined',
      });
      setItems(res.results);
      setTotal(res.count);
    } catch (e) {
      console.error(e);
      showToast('error', 'خطا در دریافت لیست کاربران');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleRoleChange = async (user: User, role: User['role']) => {
    if (!canManageRoles) {
      showToast('error', 'شما دسترسی تغییر نقش ندارید');
      return;
    }
    try {
      const updated = await updateUserRole(user.id, role);
      setItems((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      showToast('success', 'نقش کاربر با موفقیت تغییر کرد');
    } catch (e) {
      console.error(e);
      showToast('error', 'خطا در تغییر نقش کاربر');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">کاربران</h1>
      </div>

      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در کاربران..."
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">نام</th>
                <th className="text-right py-3 text-gray-400">ایمیل</th>
                <th className="text-right py-3 text-gray-400">نقش</th>
                <th className="text-right py-3 text-gray-400">تاریخ عضویت</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              )}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    هیچ کاربری یافت نشد.
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((user) => {
                  const name = user.full_name || user.username || user.email || 'بدون نام';
                  const joinDate = user.date_joined || '-';

                  return (
                    <tr key={user.id} className="border-b border-white/5">
                      <td className="py-4 text-white">{name}</td>
                      <td className="py-4 text-white">{user.email}</td>
                      <td className="py-4">
                        <select
                          disabled={!canManageRoles}
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user, e.target.value as User['role'])
                          }
                          className="bg-white/5 border border-white/10 rounded-lg text-white text-xs px-2 py-1"
                        >
                          <option value="admin">ادمین</option>
                          <option value="instructor">مدرس</option>
                          <option value="support">پشتیبان</option>
                          <option value="content_manager">مدیر محتوا</option>
                          <option value="student">دانشجو</option>
                        </select>
                      </td>
                      <td className="py-4 text-white">{joinDate}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button className="p-1 hover:bg-white/10 rounded">
                            <Edit className="h-4 w-4 text-blue-400" />
                          </button>
                          <button className="p-1 hover:bg-white/10 rounded">
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

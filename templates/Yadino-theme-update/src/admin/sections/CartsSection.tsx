import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";

const BASE_URL = "http://localhost:8000/api/";

interface Cart {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
  total_price: number;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const CartsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Cart[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    setLoading(true);
    try {
      const url =
        BASE_URL +
        `admin/carts/?page=${page}&page_size=${PAGE_SIZE}&search=${search}`;

      const res = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch carts");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت سبدهای خرید");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">سبدهای خرید</h1>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در سبدها (ایمیل کاربر)..."
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">کاربر</th>
                <th className="text-right py-3 text-gray-400">مبلغ کل</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((cart) => (
                  <tr key={cart.id} className="border-b border-white/5">
                    <td className="py-4 text-white">
                      {cart.user?.email || cart.user?.username}
                    </td>

                    <td className="py-4 text-white">
                      {cart.total_price.toLocaleString("fa")} تومان
                    </td>

                    <td className="py-4 text-white">
                      {new Date(cart.created_at).toLocaleString("fa-IR")}
                    </td>
                  </tr>
                ))}
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

import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";

const BASE_URL = "http://localhost:8000/api/";

interface Payment {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
  course: {
    id: number;
    title: string;
    slug: string;
    price: number;
    preview_image: string | null;
  } | null;
  amount: number;
  status: string;
  gateway: string;
  authority: string | null;
  ref_id: string | null;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const PaymentsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    setLoading(true);
    try {
      const url =
        BASE_URL +
        `admin/payments/?page=${page}&page_size=${PAGE_SIZE}&search=${search}&status=${statusFilter}`;

      const res = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch payments");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت لیست پرداخت‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">پرداخت‌ها</h1>
      </div>

      {/* Search + Filter */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در پرداخت‌ها (ایمیل، دوره، ref_id)..."
          rightSlot={
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="SUCCESS">موفق</option>
              <option value="FAILED">ناموفق</option>
              <option value="PENDING">در انتظار</option>
            </select>
          }
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">کاربر</th>
                <th className="text-right py-3 text-gray-400">دوره</th>
                <th className="text-right py-3 text-gray-400">مبلغ</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">درگاه</th>
                <th className="text-right py-3 text-gray-400">Ref ID</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-4 text-white">
                      {p.user?.email || p.user?.username}
                    </td>

                    <td className="py-4 text-white">
                      {p.course ? p.course.title : "—"}
                    </td>

                    <td className="py-4 text-white">
                      {p.amount.toLocaleString("fa")} تومان
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          p.status === "SUCCESS"
                            ? "bg-green-500/20 text-green-400"
                            : p.status === "FAILED"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {p.status === "SUCCESS"
                          ? "موفق"
                          : p.status === "FAILED"
                          ? "ناموفق"
                          : "در انتظار"}
                      </span>
                    </td>

                    <td className="py-4 text-white">{p.gateway}</td>

                    <td className="py-4 text-white">
                      {p.ref_id || "—"}
                    </td>

                    <td className="py-4 text-white">
                      {new Date(p.created_at).toLocaleString("fa-IR")}
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

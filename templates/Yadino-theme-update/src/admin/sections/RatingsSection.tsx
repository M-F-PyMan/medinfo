import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";

const BASE_URL = "http://localhost:8000/api/";

interface Rating {
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
  value: number;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const RatingsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Rating[]>([]);
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
        `admin/ratings/?page=${page}&page_size=${PAGE_SIZE}&search=${search}`;

      const res = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch ratings");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت امتیازها");
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
        <h1 className="text-3xl font-bold text-white">امتیازها</h1>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در امتیازها (ایمیل کاربر، عنوان دوره)..."
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">کاربر</th>
                <th className="text-right py-3 text-gray-400">دوره</th>
                <th className="text-right py-3 text-gray-400">امتیاز</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((rating) => (
                  <tr key={rating.id} className="border-b border-white/5">
                    <td className="py-4 text-white">
                      {rating.user?.email || rating.user?.username}
                    </td>

                    <td className="py-4 text-white">
                      {rating.course ? rating.course.title : "—"}
                    </td>

                    <td className="py-4 text-white">{rating.value}</td>

                    <td className="py-4 text-white">
                      {new Date(rating.created_at).toLocaleString("fa-IR")}
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

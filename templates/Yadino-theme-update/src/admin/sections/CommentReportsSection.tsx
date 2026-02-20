import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";

const BASE_URL = "http://localhost:8000/api/";

interface CommentReport {
  id: number;
  reporter: {
    id: number;
    email: string;
    username: string;
  };
  comment: {
    id: number;
    text: string;
    course: {
      id: number;
      title: string;
    } | null;
  };
  reason: string;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const CommentReportsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<CommentReport[]>([]);
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
        `admin/comment-reports/?page=${page}&page_size=${PAGE_SIZE}&search=${search}`;

      const res = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch comment reports");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت گزارش‌های کامنت");
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
        <h1 className="text-3xl font-bold text-white">گزارش کامنت‌ها</h1>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در گزارش‌ها (ایمیل، متن کامنت، دلیل)..."
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">گزارش‌دهنده</th>
                <th className="text-right py-3 text-gray-400">دوره</th>
                <th className="text-right py-3 text-gray-400">متن کامنت</th>
                <th className="text-right py-3 text-gray-400">دلیل گزارش</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
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

              {!loading &&
                items.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="py-4 text-white">
                      {r.reporter?.email || r.reporter?.username}
                    </td>

                    <td className="py-4 text-white">
                      {r.comment?.course ? r.comment.course.title : "—"}
                    </td>

                    <td className="py-4 text-white max-w-xs truncate">
                      {r.comment?.text}
                    </td>

                    <td className="py-4 text-white">{r.reason}</td>

                    <td className="py-4 text-white">
                      {new Date(r.created_at).toLocaleString("fa-IR")}
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

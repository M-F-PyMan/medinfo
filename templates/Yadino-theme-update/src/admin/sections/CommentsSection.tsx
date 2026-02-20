import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";
import { Edit, Trash2 } from "lucide-react";

const BASE_URL = "http://localhost:8000/api/";

interface Comment {
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
  } | null;
  text: string;
  status: string;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const CommentsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Comment | null>(null);
  const [text, setText] = useState("");

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    setLoading(true);
    try {
      const url =
        BASE_URL +
        `admin/comments/?page=${page}&page_size=${PAGE_SIZE}&search=${search}&status=${statusFilter}`;

      const res = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch comments");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت کامنت‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, search, statusFilter]);

  const openEditForm = (comment: Comment) => {
    setEditing(comment);
    setText(comment.text);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editing) return;

    try {
      const res = await fetch(BASE_URL + `admin/comments/${editing.id}/`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to update comment");

      showToast("success", "کامنت با موفقیت ویرایش شد");
      setFormOpen(false);
      load();
    } catch {
      showToast("error", "خطا در ویرایش کامنت");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("حذف این کامنت؟")) return;

    try {
      const res = await fetch(BASE_URL + `admin/comments/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      showToast("success", "کامنت حذف شد");
      load();
    } catch {
      showToast("error", "خطا در حذف کامنت");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">کامنت‌ها</h1>
      </div>

      {/* Search + Filter */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در کامنت‌ها (ایمیل، دوره، متن)..."
          rightSlot={
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="approved">تأیید شده</option>
              <option value="pending">در انتظار</option>
              <option value="rejected">رد شده</option>
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
                <th className="text-right py-3 text-gray-400">متن</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((c) => (
                  <tr key={c.id} className="border-b border-white/5">
                    <td className="py-4 text-white">
                      {c.user?.email || c.user?.username}
                    </td>

                    <td className="py-4 text-white">
                      {c.course ? c.course.title : "—"}
                    </td>

                    <td className="py-4 text-white max-w-xs truncate">
                      {c.text}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          c.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : c.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {c.status === "approved"
                          ? "تأیید شده"
                          : c.status === "rejected"
                          ? "رد شده"
                          : "در انتظار"}
                      </span>
                    </td>

                    <td className="py-4 text-white">
                      {new Date(c.created_at).toLocaleString("fa-IR")}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => openEditForm(c)}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Edit className="h-4 w-4 text-blue-400" />
                        </button>

                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
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

      {/* Edit Modal */}
      {formOpen && editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 w-full max-w-xl space-y-4">
            <h2 className="text-xl font-bold text-white">ویرایش کامنت</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                rows={5}
              />

              <button type="submit" className="glow-button w-full py-2 rounded-lg">
                ذخیره
              </button>
            </form>

            <button
              onClick={() => setFormOpen(false)}
              className="w-full py-2 text-gray-300 hover:text-white"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";

const BASE_URL = "http://localhost:8000/api/";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  preview_image: string | null;
  status: "draft" | "published" | "completed";
  price: number;
  sale_price: number | null;
  category: string | null;
  level: string | null;
  has_certificate: boolean;
  lessons_count: number;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const CoursesSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);

  const [form, setForm] = useState({
    has_certificate: false,
    title: "",
    description: "",
    price: 0,
    sale_price: "",
    status: "draft" as "draft" | "published" | "completed",
    category: "",
    level: "",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const canEdit =
    currentUser?.role === "admin" || currentUser?.role === "instructor";

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    setLoading(true);
    try {
      const url =
        BASE_URL +
        `admin/courses/?page=${page}&page_size=${PAGE_SIZE}&search=${search}&status=${statusFilter}`;

      const res = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت لیست دوره‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, search, statusFilter]);

  const openCreateForm = () => {
    setEditing(null);
    setForm({
      has_certificate: false,
      title: "",
      description: "",
      price: 0,
      sale_price: "",
      status: "draft",
      category: "",
      level: "",
    });
    setCoverFile(null);
    setFormOpen(true);
  };

  const openEditForm = (course: Course) => {
    setEditing(course);
    setForm({
      has_certificate: course.has_certificate,
      title: course.title,
      description: course.description || "",
      price: course.price,
      sale_price: course.sale_price ? String(course.sale_price) : "",
      status: course.status,
      category: course.category || "",
      level: course.level || "",
    });
    setCoverFile(null);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("price", String(form.price));
    if (form.sale_price) fd.append("sale_price", form.sale_price);
    fd.append("status", form.status);
    fd.append("category", form.category);
    fd.append("level", form.level);
    fd.append("has_certificate", String(form.has_certificate));

    if (coverFile) {
      fd.append("preview_image", coverFile);
    }

    try {
      let res;
      if (editing) {
        res = await fetch(BASE_URL + `admin/courses/${editing.id}/`, {
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: fd,
        });
      } else {
        res = await fetch(BASE_URL + "admin/courses/", {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: fd,
        });
      }

      if (!res.ok) throw new Error("Failed to save course");

      showToast(
        "success",
        editing ? "دوره با موفقیت ویرایش شد" : "دوره با موفقیت ایجاد شد"
      );

      setFormOpen(false);
      load();
    } catch {
      showToast("error", "خطا در ذخیره دوره");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("حذف این دوره؟")) return;

    try {
      const res = await fetch(BASE_URL + `admin/courses/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      showToast("success", "دوره حذف شد");
      load();
    } catch {
      showToast("error", "خطا در حذف دوره");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">دوره‌ها</h1>

        {canEdit && (
          <button
            onClick={openCreateForm}
            className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse"
          >
            <Plus className="h-4 w-4" />
            <span>دوره جدید</span>
          </button>
        )}
      </div>

      {/* Search + Filter */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در دوره‌ها..."
          rightSlot={
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="draft">پیش‌نویس</option>
              <option value="published">منتشر شده</option>
              <option value="completed">تکمیل شده</option>
            </select>
          }
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">عنوان</th>
                <th className="text-right py-3 text-gray-400">قیمت</th>
                <th className="text-right py-3 text-gray-400">تخفیف</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">گواهی</th>
                <th className="text-right py-3 text-gray-400">درس‌ها</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
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
                items.map((course) => (
                  <tr key={course.id} className="border-b border-white/5">
                    <td className="py-4 text-white flex items-center space-x-3 space-x-reverse">
                      {course.preview_image && (
                        <img
                          src={course.preview_image}
                          className="w-12 h-8 rounded object-cover"
                        />
                      )}
                      <span>{course.title}</span>
                    </td>
                    <td className="py-4 text-white">
                      {course.price.toLocaleString("fa")} تومان
                    </td>
                    <td className="py-4 text-white">
                      {course.sale_price
                        ? course.sale_price.toLocaleString("fa") + " تومان"
                        : "-"}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : course.status === "completed"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {course.status === "draft"
                          ? "پیش‌نویس"
                          : course.status === "published"
                          ? "منتشر شده"
                          : "تکمیل شده"}
                      </span>
                    </td>
                    <td className="py-4 text-white">
                      {course.has_certificate ? "دارد" : "ندارد"}
                    </td>
                    <td className="py-4 text-white">
                      {(course.lessons_count || 0).toLocaleString("fa")}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {canEdit && (
                          <>
                            <button
                              onClick={() => openEditForm(course)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Edit className="h-4 w-4 text-blue-400" />
                            </button>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </>
                        )}
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

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 w-full max-w-xl space-y-4">
            <h2 className="text-xl font-bold text-white">
              {editing ? "ویرایش دوره" : "دوره جدید"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  id="has_certificate"
                  type="checkbox"
                  checked={form.has_certificate}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      has_certificate: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="has_certificate" className="text-gray-300 text-sm">
                  این دوره گواهی پایان دوره دارد
                </label>
              </div>

              <input
                type="text"
                placeholder="عنوان"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                required
              />

              <textarea
                placeholder="توضیحات"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                rows={4}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="قیمت"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="قیمت با تخفیف (اختیاری)"
                  value={form.sale_price}
                  onChange={(e) =>
                    setForm({ ...form, sale_price: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="دسته‌بندی"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="سطح (مثلاً مقدماتی، پیشرفته)"
                  value={form.level}
                  onChange={(e) =>
                    setForm({ ...form, level: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm">وضعیت دوره</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: e.target.value as any,
                    }))
                  }
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                >
                  <option value="draft">پیش‌نویس</option>
                  <option value="published">منتشر شده</option>
                  <option value="completed">تکمیل شده</option>
                </select>
              </div>

              {/* Upload Cover */}
              <div>
                <label className="text-gray-300 text-sm">
                  کاور دوره (preview_image)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverFile(e.target.files[0]);
                    }
                  }}
                  className="mt-2 text-gray-300"
                />
                {editing?.preview_image && !coverFile && (
                  <img
                    src={editing.preview_image}
                    className="w-32 h-20 object-cover mt-2 rounded-lg"
                  />
                )}
              </div>

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

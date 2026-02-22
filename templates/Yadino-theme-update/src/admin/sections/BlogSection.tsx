import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";
import { Plus, Edit, Trash2 } from "lucide-react";

const BASE_URL = "http://localhost:8000/api/";

interface Category {
  id: number;
  title: string;
  slug: string;
}

interface Tag {
  id: number;
  title: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  category: Category | null;
  tags: Tag[];
  status: string;
  reading_time: number;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const BlogSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as number[],
    status: "draft" as "draft" | "published",
    reading_time: 1,
    meta_title: "",
    meta_description: "",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const token = localStorage.getItem("adminAccessToken");

  // Load categories + tags
  const loadMeta = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch(BASE_URL + "admin/blog/categories/", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }),
        fetch(BASE_URL + "admin/blog/tags/", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }),
      ]);

      setCategories(await catRes.json());
      setTags(await tagRes.json());
    } catch {
      showToast("error", "خطا در دریافت دسته‌ها و تگ‌ها");
    }
  };

  // Load posts
  const load = async () => {
    setLoading(true);
    try {
      const url =
        BASE_URL +
        `admin/blog/posts/?page=${page}&page_size=${PAGE_SIZE}&search=${search}`;

      const res = await fetch(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت پست‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeta();
    load();
  }, []);

  useEffect(() => {
    load();
  }, [page, search]);

  const openCreateForm = () => {
    setEditing(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      status: "draft",
      reading_time: 1,
      meta_title: "",
      meta_description: "",
    });
    setCoverFile(null);
    setFormOpen(true);
  };

  const openEditForm = (post: Post) => {
    setEditing(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: "", // برای امنیت، محتوا را جداگانه fetch می‌کنیم
      category: post.category ? String(post.category.id) : "",
      tags: post.tags.map((t) => t.id),
      status: post.status as any,
      reading_time: post.reading_time,
      meta_title: "",
      meta_description: "",
    });
    setCoverFile(null);
    setFormOpen(true);

    // Fetch full content
    fetch(BASE_URL + `admin/blog/posts/${post.id}/`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((r) => r.json())
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          content: data.content,
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
        }));
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("excerpt", form.excerpt);
    fd.append("content", form.content);
    fd.append("status", form.status);
    fd.append("reading_time", String(form.reading_time));
    fd.append("meta_title", form.meta_title);
    fd.append("meta_description", form.meta_description);

    if (form.category) fd.append("category", form.category);
    form.tags.forEach((t) => fd.append("tags", String(t)));

    if (coverFile) fd.append("cover_image", coverFile);

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing
        ? BASE_URL + `admin/blog/posts/${editing.id}/`
        : BASE_URL + "admin/blog/posts/";

      const res = await fetch(url, {
        method,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to save post");

      showToast(
        "success",
        editing ? "پست با موفقیت ویرایش شد" : "پست با موفقیت ایجاد شد"
      );

      setFormOpen(false);
      load();
    } catch {
      showToast("error", "خطا در ذخیره پست");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("حذف این پست؟")) return;

    try {
      const res = await fetch(BASE_URL + `admin/blog/posts/${id}/`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Failed to delete");

      showToast("success", "پست حذف شد");
      load();
    } catch {
      showToast("error", "خطا در حذف پست");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">وبلاگ</h1>

        <button
          onClick={openCreateForm}
          className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="h-4 w-4" />
          <span>پست جدید</span>
        </button>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در پست‌ها..."
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">عنوان</th>
                <th className="text-right py-3 text-gray-400">دسته</th>
                <th className="text-right py-3 text-gray-400">تگ‌ها</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">زمان مطالعه</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
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
                items.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-4 text-white">{p.title}</td>

                    <td className="py-4 text-gray-300">
                      {p.category ? p.category.title : "—"}
                    </td>

                    <td className="py-4 text-gray-300">
                      {p.tags.map((t) => t.title).join("، ")}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          p.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {p.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                      </span>
                    </td>

                    <td className="py-4 text-white">{p.reading_time} دقیقه</td>

                    <td className="py-4 text-white">
                      {new Date(p.created_at).toLocaleString("fa-IR")}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => openEditForm(p)}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Edit className="h-4 w-4 text-blue-400" />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
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

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 w-full max-w-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">
              {editing ? "ویرایش پست" : "پست جدید"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="عنوان"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                required
              />

              <textarea
                placeholder="خلاصه (excerpt)"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                rows={3}
              />

              <textarea
                placeholder="محتوا"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                rows={8}
              />

              {/* Category */}
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
              >
                <option value="">بدون دسته</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>

              {/* Tags */}
              <div>
                <label className="text-gray-300 text-sm">تگ‌ها</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {tags.map((t) => (
                    <label
                      key={t.id}
                      className="flex items-center space-x-2 space-x-reverse text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={form.tags.includes(t.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm((prev) => ({
                              ...prev,
                              tags: [...prev.tags, t.id],
                            }));
                          } else {
                            setForm((prev) => ({
                              ...prev,
                              tags: prev.tags.filter((x) => x !== t.id),
                            }));
                          }
                        }}
                      />
                      <span>{t.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as any })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">منتشر شده</option>
              </select>

              {/* Reading time */}
              <input
                type="number"
                placeholder="زمان مطالعه (دقیقه)"
                value={form.reading_time}
                onChange={(e) =>
                  setForm({ ...form, reading_time: Number(e.target.value) })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
              />

              {/* SEO */}
              <input
                type="text"
                placeholder="Meta Title"
                value={form.meta_title}
                onChange={(e) =>
                  setForm({ ...form, meta_title: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
              />

              <textarea
                placeholder="Meta Description"
                value={form.meta_description}
                onChange={(e) =>
                  setForm({ ...form, meta_description: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                rows={3}
              />

              {/* Cover Image */}
              <div>
                <label className="text-gray-300 text-sm">کاور پست</label>
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
                {editing?.cover_image && !coverFile && (
                  <img
                    src={editing.cover_image}
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

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import apiFetch from "../../utils/apiFetch";
import { useToast } from "../components/ToastProvider";

interface JobOpening {
  id: number;
  title: string;
  field: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  created_at: string;
}

function AdminJobOpeningsSection() {
  const { showToast } = useToast();

  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);

  const [form, setForm] = useState({
    title: "",
    field: "",
    type: "مدرس",
    location: "دورکاری",
    description: "",
    requirements: "",
    benefits: "",
  });

  // -------------------------
  // Fetch Jobs
  // -------------------------
  const fetchJobs = async () => {
    try {
      const res = await apiFetch("/admin/job-openings/");
      setJobs(res);
    } catch {
      showToast("error", "خطا در دریافت لیست فرصت‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchJobs();
  }, []);

  // -------------------------
  // Open Modal (Add / Edit)
  // -------------------------
  const openAddModal = () => {
    setEditingJob(null);
    setForm({
      title: "",
      field: "",
      type: "مدرس",
      location: "دورکاری",
      description: "",
      requirements: "",
      benefits: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (job: JobOpening) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      field: job.field,
      type: job.type,
      location: job.location,
      description: job.description,
      requirements: job.requirements.join("\n"),
      benefits: job.benefits.join("\n"),
    });
    setModalOpen(true);
  };

  // -------------------------
  // Submit Form
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      requirements: form.requirements.split("\n").filter(Boolean),
      benefits: form.benefits.split("\n").filter(Boolean),
    };

    try {
      if (editingJob) {
        await apiFetch(`/admin/job-openings/${editingJob.id}/`, "PUT", payload);
        showToast("success", "فرصت با موفقیت ویرایش شد");
      } else {
        await apiFetch("/admin/job-openings/", "POST", payload);
        showToast("success", "فرصت جدید اضافه شد");
      }

      setModalOpen(false);
      void fetchJobs();
    } catch {
      showToast("error", "خطا در ذخیره اطلاعات");
    }
  };

  // -------------------------
  // Delete Job
  // -------------------------
  const deleteJob = async (id: number) => {
    if (!window.confirm("آیا از حذف این فرصت مطمئن هستید؟")) return;

    try {
      await apiFetch(`/admin/job-openings/${id}/`, "DELETE");
      showToast("success", "فرصت حذف شد");
      void fetchJobs();
    } catch {
      showToast("error", "خطا در حذف فرصت");
    }
  };

  return (
    <div className="p-6 rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">مدیریت فرصت‌های تدریس</h2>
        <button
          onClick={openAddModal}
          className="glow-button px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          افزودن فرصت جدید
        </button>
      </div>

      {/* Table */}
      <div className="glass rounded-xl p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 text-gray-400">در حال بارگذاری...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center py-6 text-gray-400">هیچ فرصتی ثبت نشده است</p>
        ) : (
          <table className="w-full text-right">
            <thead>
              <tr className="text-gray-300 border-b border-white/10">
                <th className="p-3">عنوان</th>
                <th className="p-3">رشته</th>
                <th className="p-3">مکان</th>
                <th className="p-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-white/5">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.field}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => openEditModal(job)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass rounded-xl p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-xl font-bold mb-6">
              {editingJob ? "ویرایش فرصت" : "افزودن فرصت جدید"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2">عنوان *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input-style"
                />
              </div>

              <div>
                <label className="block mb-2">رشته *</label>
                <input
                  type="text"
                  required
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  className="input-style"
                />
              </div>

              <div>
                <label className="block mb-2">مکان</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="input-style"
                />
              </div>

              <div>
                <label className="block mb-2">توضیحات *</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-style resize-none"
                />
              </div>

              <div>
                <label className="block mb-2">الزامات (هر خط یک مورد)</label>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="input-style resize-none"
                />
              </div>

              <div>
                <label className="block mb-2">مزایا (هر خط یک مورد)</label>
                <textarea
                  rows={4}
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  className="input-style resize-none"
                />
              </div>

              <button type="submit" className="glow-button w-full py-3 rounded-lg font-semibold">
                ذخیره
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJobOpeningsSection;

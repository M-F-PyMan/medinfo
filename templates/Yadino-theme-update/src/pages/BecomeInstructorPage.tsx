import { useEffect, useState } from "react";
import { useToast } from "../admin/components/ToastProvider";
import apiFetch from "../utils/apiFetch";
import { Send, Upload } from "lucide-react";

function BecomeInstructorPage() {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    specialty: "",
    experience: "",
    coverLetter: "",
    portfolio: "",
    national_card_front: null as File | null,
    national_card_back: null as File | null,
    medical_card_front: null as File | null,
    medical_card_back: null as File | null,
    resume_file: null as File | null,
  });

  // -------------------------
  // Read specialty from URL
  // -------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const specialty = params.get("specialty");
    if (specialty) {
      setForm((prev) => ({ ...prev, specialty }));
    }
  }, []);

  // -------------------------
  // Handle file input
  // -------------------------
  const handleFile = (key: keyof typeof form, file: File | null) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  // -------------------------
  // Submit form
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("specialty", form.specialty);
    fd.append("experience", form.experience);
    fd.append("admin_note", "");
    fd.append("coverLetter", form.coverLetter);
    fd.append("portfolio", form.portfolio);

    if (form.national_card_front) fd.append("national_card_front", form.national_card_front);
    if (form.national_card_back) fd.append("national_card_back", form.national_card_back);
    if (form.medical_card_front) fd.append("medical_card_front", form.medical_card_front);
    if (form.medical_card_back) fd.append("medical_card_back", form.medical_card_back);
    if (form.resume_file) fd.append("resume_file", form.resume_file);

    try {
      await apiFetch("/teacher-applications/", "POST", fd, true);
      showToast("success", "درخواست شما با موفقیت ثبت شد");
      window.location.href = "/profile";
    } catch (err: any) {
      showToast("error", err.message || "خطا در ارسال درخواست");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">درخواست تبدیل شدن به مدرس</h1>

      <p className="text-gray-400 text-center mb-10">
        لطفاً اطلاعات زیر را تکمیل کنید تا درخواست شما بررسی شود
      </p>

      <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">

        {/* Specialty */}
        <div>
          <label className="block mb-2 font-medium">رشته تخصصی *</label>
          <input
            type="text"
            required
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            className="input-style"
            placeholder="مثال: React, Python, پزشکی"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-medium">سال‌های تجربه *</label>
          <select
            required
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="input-style"
          >
            <option value="">انتخاب کنید</option>
            <option value="0-1">کمتر از ۱ سال</option>
            <option value="1-3">۱ تا ۳ سال</option>
            <option value="3-5">۳ تا ۵ سال</option>
            <option value="5+">بیش از ۵ سال</option>
          </select>
        </div>

        {/* Portfolio */}
        <div>
          <label className="block mb-2 font-medium">لینک پورتفولیو / نمونه‌کار</label>
          <input
            type="url"
            value={form.portfolio}
            onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
            className="input-style"
            placeholder="https://example.com"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block mb-2 font-medium">نامه انگیزشی</label>
          <textarea
            rows={5}
            value={form.coverLetter}
            onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
            className="input-style resize-none"
            placeholder="چرا می‌خواهید مدرس شوید؟"
          />
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">کارت ملی (جلوی کارت)</label>
            <label className="upload-box">
              <Upload className="h-5 w-5" />
              <span>انتخاب فایل</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile("national_card_front", e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">کارت ملی (پشت کارت)</label>
            <label className="upload-box">
              <Upload className="h-5 w-5" />
              <span>انتخاب فایل</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile("national_card_back", e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">کارت نظام پزشکی (جلوی کارت)</label>
            <label className="upload-box">
              <Upload className="h-5 w-5" />
              <span>انتخاب فایل</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile("medical_card_front", e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">کارت نظام پزشکی (پشت کارت)</label>
            <label className="upload-box">
              <Upload className="h-5 w-5" />
              <span>انتخاب فایل</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile("medical_card_back", e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">فایل رزومه</label>
            <label className="upload-box">
              <Upload className="h-5 w-5" />
              <span>انتخاب فایل</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFile("resume_file", e.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="glow-button w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Send className="h-5 w-5" />
          {loading ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </form>
    </div>
  );
}

export default BecomeInstructorPage;

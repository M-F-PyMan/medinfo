import React, { useState, useEffect } from "react";
import { Send, Award, FileText, CreditCard, ShieldCheck } from "lucide-react";


const API_BASE = "http://127.0.0.1:8000/api";

type ApplicationStatus = "none" | "pending" | "accepted" | "rejected";

interface TeacherApplication {
  id: number;
  specialty: string | null;
  experience: string | null;
  national_card_front: string | null;
  national_card_back: string | null;
  medical_card_front: string | null;
  medical_card_back: string | null;
  resume_file: string | null;
  status: ApplicationStatus;
  admin_note: string | null;
  created_at: string;
  reviewed_at: string | null;
}

function BecomeInstructorPage() {
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [currentApplication, setCurrentApplication] =
    useState<TeacherApplication | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    specialty: "",
    experience: "",
  });

  const [files, setFiles] = useState<{
    national_card_front: File | null;
    national_card_back: File | null;
    medical_card_front: File | null;
    medical_card_back: File | null;
    resume_file: File | null;
  }>({
    national_card_front: null,
    national_card_back: null,
    medical_card_front: null,
    medical_card_back: null,
    resume_file: null,
  });

  // گرفتن آخرین درخواست کاربر
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setStatusLoading(true);
        setError(null);
        const res = await fetch(
          `${API_BASE}/accounts/teacher-applications/`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("خطا در دریافت وضعیت درخواست");
        }
        const data: TeacherApplication[] = await res.json();
        setCurrentApplication(data[0] || null);
      } catch (err: any) {
        setError(err.message || "خطای ناشناخته");
      } finally {
        setStatusLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleFileChange = (
    field:
      | "national_card_front"
      | "national_card_back"
      | "medical_card_front"
      | "medical_card_back"
      | "resume_file",
    file: File | null
  ) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("specialty", form.specialty);
      formData.append("experience", form.experience);

      if (files.national_card_front)
        formData.append("national_card_front", files.national_card_front);
      if (files.national_card_back)
        formData.append("national_card_back", files.national_card_back);
      if (files.medical_card_front)
        formData.append("medical_card_front", files.medical_card_front);
      if (files.medical_card_back)
        formData.append("medical_card_back", files.medical_card_back);
      if (files.resume_file)
        formData.append("resume_file", files.resume_file);

      const res = await fetch(
        `${API_BASE}/accounts/teacher-applications/`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.detail ||
            data?.non_field_errors?.[0] ||
            "خطا در ارسال درخواست"
        );
      }

      const data: TeacherApplication = await res.json();
      setCurrentApplication(data);
      setSuccess("درخواست شما با موفقیت ثبت شد.");
    } catch (err: any) {
      setError(err.message || "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = () => {
    if (!currentApplication) return null;
    const status = currentApplication.status;
    let label = "";
    let color = "";

    if (status === "pending") {
      label = "در انتظار بررسی";
      color = "bg-yellow-500/20 text-yellow-300";
    } else if (status === "accepted") {
      label = "تأیید شده";
      color = "bg-green-500/20 text-green-300";
    } else if (status === "rejected") {
      label = "رد شده";
      color = "bg-red-500/20 text-red-300";
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        وضعیت درخواست: {label}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Award className="h-8 w-8 text-purple-400" />
          <span>درخواست تبدیل شدن به مدرس</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          اگر پزشک، پرستار، روانشناس یا متخصص حوزه سلامت هستید، می‌توانید با
          تکمیل فرم زیر برای تدریس در مد اینفو درخواست ارسال کنید.
        </p>
      </div>

      {/* Status */}
      {statusLoading ? (
        <div className="glass rounded-xl p-4 mb-6 text-center text-gray-400">
          در حال بررسی وضعیت درخواست شما...
        </div>
      ) : (
        currentApplication && (
          <div className="glass rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              {renderStatusBadge()}
              {currentApplication.admin_note && (
                <p className="text-sm text-gray-300">
                  توضیح ادمین: {currentApplication.admin_note}
                </p>
              )}
            </div>
            <div className="text-xs text-gray-500">
              ثبت شده در{" "}
              {new Date(
                currentApplication.created_at
              ).toLocaleDateString("fa-IR")}
            </div>
          </div>
        )
      )}

      {/* Info boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <CreditCard className="h-6 w-6 text-purple-400 mt-1" />
          <div>
            <h3 className="font-semibold mb-1 text-sm">مدارک هویتی</h3>
            <p className="text-xs text-gray-400">
              آپلود تصویر پشت و روی کارت ملی و کارت نظام پزشکی/پرستاری/روانشناسی
            </p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <FileText className="h-6 w-6 text-purple-400 mt-1" />
          <div>
            <h3 className="font-semibold mb-1 text-sm">سوابق و تخصص</h3>
            <p className="text-xs text-gray-400">
              وارد کردن حوزه تخصصی و سال‌های تجربه به همراه رزومه
            </p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 text-purple-400 mt-1" />
          <div>
            <h3 className="font-semibold mb-1 text-sm">بررسی و تأیید</h3>
            <p className="text-xs text-gray-400">
              پس از بررسی مدارک، نتیجه از طریق نوتیفیکیشن به شما اطلاع داده
              می‌شود
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="glass rounded-xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          فرم درخواست مدرس شدن
        </h2>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-300 text-sm rounded-lg p-3 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Specialty & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                حوزه تخصصی *
              </label>
              <input
                type="text"
                required
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="مثلاً: روانپزشکی، پرستاری ICU، روانشناسی بالینی"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                سال‌های تجربه *
              </label>
              <select
                required
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" className="bg-slate-800">
                  انتخاب کنید
                </option>
                <option value="0-1" className="bg-slate-800">
                  کمتر از ۱ سال
                </option>
                <option value="1-3" className="bg-slate-800">
                  ۱ تا ۳ سال
                </option>
                <option value="3-5" className="bg-slate-800">
                  ۳ تا ۵ سال
                </option>
                <option value="5+" className="bg-slate-800">
                  بیش از ۵ سال
                </option>
              </select>
            </div>
          </div>

          {/* Files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                کارت ملی - روی کارت *
              </label>
              <input
                type="file"
                accept="image/*"
                required={!currentApplication}
                onChange={(e) =>
                  handleFileChange(
                    "national_card_front",
                    e.target.files?.[0] || null
                  )
                }
                className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/80 file:text-white hover:file:bg-purple-500 bg-white/5 border border-white/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                کارت ملی - پشت کارت *
              </label>
              <input
                type="file"
                accept="image/*"
                required={!currentApplication}
                onChange={(e) =>
                  handleFileChange(
                    "national_card_back",
                    e.target.files?.[0] || null
                  )
                }
                className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/80 file:text-white hover:file:bg-purple-500 bg-white/5 border border-white/10 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                کارت نظام پزشکی/پرستاری/روانشناسی - روی کارت
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(
                    "medical_card_front",
                    e.target.files?.[0] || null
                  )
                }
                className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/80 file:text-white hover:file:bg-purple-500 bg-white/5 border border-white/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                کارت نظام پزشکی/پرستاری/روانشناسی - پشت کارت
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(
                    "medical_card_back",
                    e.target.files?.[0] || null
                  )
                }
                className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/80 file:text-white hover:file:bg-purple-500 bg-white/5 border border-white/10 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              رزومه / مدارک تکمیلی
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) =>
                handleFileChange(
                  "resume_file",
                  e.target.files?.[0] || null
                )
              }
              className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/80 file:text-white hover:file:bg-purple-500 bg:white/5 bg-white/5 border border-white/10 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glow-button py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-60"
          >
            <Send className="h-5 w-5" />
            <span>{loading ? "در حال ارسال..." : "ارسال درخواست"}</span>
          </button>
        </form>
      </section>
    </div>
  );
}

export default BecomeInstructorPage;

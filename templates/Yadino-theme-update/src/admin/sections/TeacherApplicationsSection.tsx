import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Eye, Loader2 } from "lucide-react";
import { apiFetch } from "../api/client";
import { useToast } from "../components/ToastProvider";

export const TeacherApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const [rejectModal, setRejectModal] = useState({
    open: false,
    id: null,
    reason: "",
  });

  const { showToast } = useToast();

  const notify = (type: "success" | "error" | "info", msg: string) => {
    showToast(type, msg);
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("accounts/admin/teacher-applications/");
      setApplications(data);
    } catch {
      notify("error", "خطا در دریافت درخواست‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      await apiFetch(`accounts/admin/teacher-applications/${id}/accept/`, "POST");
      notify("success", "درخواست تأیید شد");
      fetchApplications();
    } catch {
      notify("error", "خطا در تأیید درخواست");
    }
  };

  const handleReject = async () => {
    if (!rejectModal.id) return;

    try {
      await apiFetch(
        `accounts/admin/teacher-applications/${rejectModal.id}/reject/`,
        "POST",
        { reason: rejectModal.reason }
      );

      notify("success", "درخواست رد شد");
      setRejectModal({ open: false, id: null, reason: "" });
      fetchApplications();
    } catch {
      notify("error", "خطا در رد درخواست");
    }
  };

  const filtered = applications.filter((app: any) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">درخواست‌های تبدیل شدن به مدرس</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {[
          { id: "all", label: "همه" },
          { id: "pending", label: "در انتظار" },
          { id: "accepted", label: "تأیید شده" },
          { id: "rejected", label: "رد شده" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === f.id
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          هیچ درخواستی یافت نشد
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {filtered.map((app: any) => (
          <div
            key={app.id}
            className="glass p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="font-semibold text-lg">
                {app.user.name || app.user.username}
              </div>
              <div className="text-sm text-gray-400">{app.user.email}</div>

              <div className="text-sm mt-2">
                تخصص: <span className="text-purple-300">{app.specialty}</span>
              </div>
              <div className="text-sm">
                تجربه: <span className="text-purple-300">{app.experience}</span>
              </div>
            </div>

            {/* Files */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "کارت ملی - رو", file: app.national_card_front },
                { label: "کارت ملی - پشت", file: app.national_card_back },
                { label: "کارت نظام - رو", file: app.medical_card_front },
                { label: "کارت نظام - پشت", file: app.medical_card_back },
                { label: "رزومه", file: app.resume_file },
              ].map(
                (f, i) =>
                  f.file && (
                    <a
                      key={i}
                      href={f.file}
                      target="_blank"
                      className="text-xs bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-white/20"
                    >
                      <Eye className="h-3 w-3" />
                      {f.label}
                    </a>
                  )
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {app.status === "pending" && (
                <>
                  <button
                    onClick={() => handleAccept(app.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    تأیید
                  </button>

                  <button
                    onClick={() =>
                      setRejectModal({
                        open: true,
                        id: app.id,
                        reason: "",
                      })
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    رد
                  </button>
                </>
              )}

              {app.status === "accepted" && (
                <span className="text-green-400 text-sm">تأیید شده</span>
              )}

              {app.status === "rejected" && (
                <span className="text-red-400 text-sm">رد شده</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="glass p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">رد درخواست</h2>

            <textarea
              rows={4}
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal({ ...rejectModal, reason: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white"
              placeholder="دلیل رد درخواست را وارد کنید"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() =>
                  setRejectModal({ open: false, id: null, reason: "" })
                }
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
              >
                انصراف
              </button>

              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm"
              >
                رد درخواست
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";
import { MessageSquare, Send, X } from "lucide-react";

const BASE_URL = "http://localhost:8000/api/";

interface Ticket {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
  subject: string;
  status: string;
  messages_count: number;
  created_at: string;
}

interface TicketMessage {
  id: number;
  ticket: number;
  ticket_subject: string;
  sender: {
    id: number;
    email: string;
    username: string;
  };
  text: string;
  file: string | null;
  created_at: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const PAGE_SIZE = 10;

export const TicketsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<Ticket[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messageFile, setMessageFile] = useState<File | null>(null);

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    setLoading(true);
    try {
      const url =
        BASE_URL +
        `admin/tickets/?page=${page}&page_size=${PAGE_SIZE}&search=${search}&status=${statusFilter}`;

      const res = await fetch(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();
      setItems(data.results);
      setTotal(data.count);
    } catch {
      showToast("error", "خطا در دریافت تیکت‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, search, statusFilter]);

  const openTicket = async (ticket: Ticket) => {
    setSelectedTicket(ticket);

    try {
      const res = await fetch(
        BASE_URL + `admin/ticket-messages/?ticket=${ticket.id}`,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      const data = await res.json();
      setMessages(data.results);
    } catch {
      showToast("error", "خطا در دریافت پیام‌های تیکت");
    }
  };

  const sendMessage = async () => {
    if (!selectedTicket) return;

    const fd = new FormData();
    fd.append("ticket", String(selectedTicket.id));
    fd.append("text", messageText);
    if (messageFile) fd.append("file", messageFile);

    try {
      const res = await fetch(BASE_URL + "admin/ticket-messages/", {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to send message");

      setMessageText("");
      setMessageFile(null);
      openTicket(selectedTicket);
      showToast("success", "پیام ارسال شد");
    } catch {
      showToast("error", "خطا در ارسال پیام");
    }
  };

  const closeTicket = async () => {
    if (!selectedTicket) return;

    try {
      const res = await fetch(
        BASE_URL + `admin/tickets/${selectedTicket.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "closed" }),
        }
      );

      if (!res.ok) throw new Error("Failed to close ticket");

      showToast("success", "تیکت بسته شد");
      setSelectedTicket(null);
      load();
    } catch {
      showToast("error", "خطا در بستن تیکت");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">تیکت‌ها</h1>
      </div>

      {/* Search + Filter */}
      <div className="glass rounded-xl p-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="جستجو در تیکت‌ها..."
          rightSlot={
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="open">باز</option>
              <option value="pending">در انتظار</option>
              <option value="closed">بسته</option>
            </select>
          }
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">کاربر</th>
                <th className="text-right py-3 text-gray-400">موضوع</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">پیام‌ها</th>
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
                items.map((t) => (
                  <tr key={t.id} className="border-b border-white/5">
                    <td className="py-4 text-white">
                      {t.user?.email || t.user?.username}
                    </td>

                    <td className="py-4 text-white">{t.subject}</td>

                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          t.status === "closed"
                            ? "bg-red-500/20 text-red-400"
                            : t.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {t.status === "closed"
                          ? "بسته"
                          : t.status === "pending"
                          ? "در انتظار"
                          : "باز"}
                      </span>
                    </td>

                    <td className="py-4 text-white">{t.messages_count}</td>

                    <td className="py-4 text-white">
                      {new Date(t.created_at).toLocaleString("fa-IR")}
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => openTicket(t)}
                        className="p-1 hover:bg-white/10 rounded flex items-center space-x-1 space-x-reverse"
                      >
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">مشاهده</span>
                      </button>
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

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 w-full max-w-2xl space-y-4 relative">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 left-4 p-1 hover:bg-white/10 rounded"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>

            <h2 className="text-xl font-bold text-white">
              تیکت: {selectedTicket.subject}
            </h2>

            {/* Messages */}
            <div className="max-h-96 overflow-y-auto space-y-4 p-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-lg ${
                    m.sender.id === currentUser?.id
                      ? "bg-purple-500/20 text-purple-200"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <div className="text-sm opacity-70">
                    {m.sender.email || m.sender.username}
                  </div>
                  <div className="mt-1">{m.text}</div>
                  {m.file && (
                    <a
                      href={m.file}
                      target="_blank"
                      className="text-blue-400 underline text-sm mt-1 block"
                    >
                      دانلود فایل
                    </a>
                  )}
                  <div className="text-xs opacity-50 mt-1">
                    {new Date(m.created_at).toLocaleString("fa-IR")}
                  </div>
                </div>
              ))}
            </div>

            {/* Send Message */}
            <div className="space-y-3">
              <textarea
                placeholder="پاسخ..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                rows={3}
              />

              <input
                type="file"
                onChange={(e) =>
                  setMessageFile(e.target.files ? e.target.files[0] : null)
                }
                className="text-gray-300"
              />

              <button
                onClick={sendMessage}
                className="glow-button w-full py-2 rounded-lg flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Send className="h-4 w-4" />
                <span>ارسال پیام</span>
              </button>

              {selectedTicket.status !== "closed" && (
                <button
                  onClick={closeTicket}
                  className="w-full py-2 text-red-400 hover:text-red-300"
                >
                  بستن تیکت
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

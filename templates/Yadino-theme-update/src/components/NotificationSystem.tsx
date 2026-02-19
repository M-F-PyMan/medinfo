import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import {
  Bell, X, CheckCircle, AlertCircle, Info, Clock, Trophy, Gift, MessageCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  target_url?: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationSystemProps {
  variant?: 'dropdown' | 'inline';
}

const API_BASE = "http://127.0.0.1:8000/api"; // اگر آدرس سرورت چیز دیگه‌ایه اینو بگو

const NotificationSystem: React.FC<NotificationSystemProps> = ({ variant = 'dropdown' }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const authHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access") || ""}`
  };

  // -----------------------------
  // 🔥 Fetch Notifications
  // -----------------------------
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications/`, {
        headers: authHeaders
      });

      const data = await res.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
    } catch (err) {
      console.error("Error fetching notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // -----------------------------
  // 🔥 Mark as Read
  // -----------------------------
  const markAsRead = async (id: string) => {
    try {
      await fetch(`${API_BASE}/notifications/${id}/read/`, {
        method: "POST",
        headers: authHeaders
      });

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  // -----------------------------
  // 🔥 Mark All as Read
  // -----------------------------
  const markAllAsRead = async () => {
    try {
      await fetch(`${API_BASE}/notifications/read_all/`, {
        method: "POST",
        headers: authHeaders
      });

      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  };

  // -----------------------------
  // 🔥 Delete Notification
  // -----------------------------
  const deleteNotification = async (id: string) => {
    try {
      await fetch(`${API_BASE}/notifications/${id}/delete/`, {
        method: "DELETE",
        headers: authHeaders
      });

      setNotifications(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => {
        const notif = notifications.find(n => n.id === id);
        return notif && !notif.is_read ? Math.max(0, prev - 1) : prev;
      });
    } catch (err) {
      console.error("Error deleting notification", err);
    }
  };

  // -----------------------------
  // 🔥 Icons based on backend types
  // -----------------------------
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Info className="h-5 w-5 text-blue-400" />;
      case 'payment':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'coupon':
        return <Gift className="h-5 w-5 text-red-400" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-purple-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'course':
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  // -----------------------------
  // 🔥 Time formatter
  // -----------------------------
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'همین الان';
    if (diffInMinutes < 60) return `${diffInMinutes} دقیقه پیش`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} روز پیش`;
  };

  // -----------------------------
  // 🔥 Inline Variant (Header)
  // -----------------------------
  if (variant === 'inline') {
    return (
      <div className="flex items-center">
        <Bell className="h-4 w-4 text-gray-400" />
        {unreadCount > 0 && (
          <span className="mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
    );
  }

  // -----------------------------
  // 🔥 Dropdown Variant
  // -----------------------------
  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Bell className="h-6 w-6 text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 glass rounded-lg shadow-xl border border-white/10 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">اعلان‌ها</h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  علامت‌گذاری همه
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto p-2">
            {loading ? (
              <div className="p-4 text-center text-gray-400">در حال بارگذاری...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>هیچ اعلانی ندارید</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`relative p-3 rounded-lg mb-2 transition-all ${
                    n.is_read
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-purple-500/10 border border-purple-500/20'
                  }`}
                >
                  {!n.is_read && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}

                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(n.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-medium ${n.is_read ? 'text-gray-300' : 'text-white'}`}>
                        {n.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{n.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{formatTimeAgo(n.created_at)}</p>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1 space-x-reverse mt-2">
                        {!n.is_read && (
                          <button
                            onClick={() => markAsRead(n.id)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <CheckCircle className="h-3 w-3 text-gray-400" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(n.id)}
                          className="p-1 rounded-full hover:bg-red-500/20 transition-colors"
                        >
                          <X className="h-3 w-3 text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-white/10">
              <Link
                to="/notifications"
                className="block w-full text-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                مشاهده همه اعلان‌ها
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;

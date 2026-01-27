import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, X, CheckCircle, AlertCircle, Info, Star, Clock, BookOpen, Trophy, Gift, MessageCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reminder' | 'achievement' | 'discount' | 'motivational';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  icon?: React.ReactNode;
}

interface NotificationSystemProps {
  variant?: 'dropdown' | 'inline';
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ variant = 'dropdown' }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'reminder',
        title: 'یادآوری کلاس',
        message: 'کلاس React.js شما در 30 دقیقه دیگر شروع می‌شود',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: false,
        actionUrl: '/courses/react-js',
        icon: <Clock className="h-5 w-5 text-blue-400" />
      },
      {
        id: '2',
        type: 'achievement',
        title: 'دستاورد جدید!',
        message: 'تبریک! شما 10 درس را با موفقیت تکمیل کردید',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: false,
        actionUrl: '/gamification',
        icon: <Trophy className="h-5 w-5 text-yellow-400" />
      },
      {
        id: '3',
        type: 'discount',
        title: 'تخفیف ویژه!',
        message: '50% تخفیف روی تمام دوره‌های JavaScript تا پایان هفته',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        isRead: false,
        actionUrl: '/courses',
        icon: <Gift className="h-5 w-5 text-red-400" />
      },
      {
        id: '4',
        type: 'motivational',
        title: 'پیام انگیزشی',
        message: 'امروز روز خوبی برای یادگیری است! ادامه دهید',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        isRead: true,
        icon: <Star className="h-5 w-5 text-purple-400" />
      },
      {
        id: '5',
        type: 'success',
        title: 'تکمیل دوره',
        message: 'دوره HTML & CSS شما با موفقیت تکمیل شد',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        isRead: true,
        actionUrl: '/dashboard',
        icon: <CheckCircle className="h-5 w-5 text-green-400" />
      },
      {
        id: '6',
        type: 'info',
        title: 'به‌روزرسانی سیستم',
        message: 'سیستم یادگیری هوشمند جدید اضافه شد',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
        isRead: true,
        icon: <Info className="h-5 w-5 text-blue-400" />
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => {
      const notification = notifications.find(n => n.id === id);
      return notification && !notification.isRead ? Math.max(0, prev - 1) : prev;
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-blue-400" />;
      case 'achievement':
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 'discount':
        return <Gift className="h-5 w-5 text-red-400" />;
      case 'motivational':
        return <Star className="h-5 w-5 text-purple-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'همین الان';
    if (diffInMinutes < 60) return `${diffInMinutes} دقیقه پیش`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} روز پیش`;
  };

  // Inline variant for user dropdown
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

  return (
    <div className="relative">
      {/* Notification Bell */}
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

      {/* Notification Dropdown */}
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

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>هیچ اعلانی ندارید</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative p-3 rounded-lg mb-2 transition-all ${
                      notification.isRead 
                        ? 'bg-white/5 hover:bg-white/10' 
                        : 'bg-purple-500/10 border border-purple-500/20'
                    }`}
                  >
                    {/* Unread Indicator */}
                    {!notification.isRead && (
                      <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full"></div>
                    )}

                    {/* Notification Content */}
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="flex-shrink-0 mt-1">
                        {notification.icon || getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${
                              notification.isRead ? 'text-gray-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center space-x-1 space-x-reverse ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                title="علامت‌گذاری به عنوان خوانده شده"
                              >
                                <CheckCircle className="h-3 w-3 text-gray-400" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 rounded-full hover:bg-red-500/20 transition-colors"
                              title="حذف"
                            >
                              <X className="h-3 w-3 text-gray-400 hover:text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

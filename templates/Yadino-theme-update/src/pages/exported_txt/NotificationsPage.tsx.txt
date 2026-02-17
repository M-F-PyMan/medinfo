import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Star, Clock, Trophy, Gift, MessageCircle, Filter, Search, Trash2, Settings } from 'lucide-react';

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

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

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
      },
      {
        id: '7',
        type: 'warning',
        title: 'یادآوری تکلیف',
        message: 'تکلیف پروژه React شما تا فردا موعد دارد',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isRead: false,
        actionUrl: '/dashboard',
        icon: <AlertCircle className="h-5 w-5 text-yellow-400" />
      },
      {
        id: '8',
        type: 'reminder',
        title: 'یادآوری آزمون',
        message: 'آزمون JavaScript شما در 2 ساعت دیگر شروع می‌شود',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        isRead: false,
        actionUrl: '/courses/javascript',
        icon: <Clock className="h-5 w-5 text-blue-400" />
      }
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  // Filter and search notifications
  useEffect(() => {
    let filtered = notifications;

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === selectedFilter);
    }

    // Filter by read status
    if (selectedFilter === 'unread') {
      filtered = filtered.filter(notification => !notification.isRead);
    } else if (selectedFilter === 'read') {
      filtered = filtered.filter(notification => notification.isRead);
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, selectedFilter, searchTerm]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
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

  const getFilterLabel = (filter: string) => {
    switch (filter) {
      case 'all': return 'همه';
      case 'unread': return 'نخوانده';
      case 'read': return 'خوانده شده';
      case 'reminder': return 'یادآوری';
      case 'achievement': return 'دستاورد';
      case 'discount': return 'تخفیف';
      case 'motivational': return 'انگیزشی';
      case 'success': return 'موفقیت';
      case 'warning': return 'هشدار';
      case 'info': return 'اطلاعات';
      default: return filter;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rtl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-2 md:p-3 glass rounded-lg">
                <Bell className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">اعلان‌ها</h1>
                <p className="text-sm md:text-base text-gray-400">مدیریت اعلان‌های خود</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-2 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  علامت‌گذاری همه
                </button>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="glass rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">کل اعلان‌ها</p>
                  <p className="text-lg md:text-2xl font-bold text-white">{notifications.length}</p>
                </div>
                <Bell className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
              </div>
            </div>
            
            <div className="glass rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">نخوانده</p>
                  <p className="text-lg md:text-2xl font-bold text-white">{unreadCount}</p>
                </div>
                <div className="h-6 w-6 md:h-8 md:w-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm font-bold">{unreadCount}</span>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">امروز</p>
                  <p className="text-lg md:text-2xl font-bold text-white">
                    {notifications.filter(n => {
                      const today = new Date();
                      const notificationDate = new Date(n.timestamp);
                      return notificationDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
              </div>
            </div>
            
            <div className="glass rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">دستاوردها</p>
                  <p className="text-lg md:text-2xl font-bold text-white">
                    {notifications.filter(n => n.type === 'achievement').length}
                  </p>
                </div>
                <Trophy className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

                {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو در اعلان‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <Filter className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 md:px-4 md:py-3 bg-gray-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                style={{ colorScheme: 'dark' }}
              >
                <option value="all" className="bg-gray-800 text-white">همه اعلان‌ها</option>
                <option value="unread" className="bg-gray-800 text-white">نخوانده</option>
                <option value="read" className="bg-gray-800 text-white">خوانده شده</option>
                <option value="reminder" className="bg-gray-800 text-white">یادآوری</option>
                <option value="achievement" className="bg-gray-800 text-white">دستاورد</option>
                <option value="discount" className="bg-gray-800 text-white">تخفیف</option>
                <option value="motivational" className="bg-gray-800 text-white">انگیزشی</option>
                <option value="success" className="bg-gray-800 text-white">موفقیت</option>
                <option value="warning" className="bg-gray-800 text-white">هشدار</option>
                <option value="info" className="bg-gray-800 text-white">اطلاعات</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 md:space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="glass rounded-lg p-6 md:p-8 text-center">
              <Bell className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4 text-gray-400 opacity-50" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">هیچ اعلانی یافت نشد</h3>
              <p className="text-sm md:text-base text-gray-400">هیچ اعلانی با فیلترهای انتخاب شده مطابقت ندارد</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`glass rounded-lg p-4 md:p-6 transition-all ${
                  notification.isRead 
                    ? 'bg-white/5 hover:bg-white/10' 
                    : 'bg-purple-500/10 border border-purple-500/20'
                }`}
              >
                <div className="flex items-start space-x-3 md:space-x-4 space-x-reverse">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {notification.icon || getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <h3 className={`text-base md:text-lg font-semibold ${
                            notification.isRead ? 'text-gray-300' : 'text-white'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                              جدید
                            </span>
                          )}
                        </div>
                        <p className="text-sm md:text-base text-gray-400 mb-2 md:mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0">
                          <p className="text-xs md:text-sm text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                            {getFilterLabel(notification.type)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse ml-2 md:ml-4">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 md:p-2 rounded-full hover:bg-white/10 transition-colors"
                            title="علامت‌گذاری به عنوان خوانده شده"
                          >
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 md:p-2 rounded-full hover:bg-red-500/20 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-lg p-4 md:p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-white">تنظیمات اعلان‌ها</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-300">یادآوری کلاس‌ها</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-300">اعلان دستاوردها</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-300">تخفیف‌ها</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-300">پیام‌های انگیزشی</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
              
              <div className="mt-4 md:mt-6 flex space-x-2 space-x-reverse">
                <button
                  onClick={deleteAllRead}
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  حذف خوانده شده‌ها
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

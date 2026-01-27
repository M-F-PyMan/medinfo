import React, { useState } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, Play, Download, Users, Clock } from 'lucide-react';

function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه موضوعات', icon: '📚' },
    { id: 'account', name: 'حساب کاربری', icon: '👤' },
    { id: 'courses', name: 'دوره‌ها', icon: '🎓' },
    { id: 'payment', name: 'پرداخت', icon: '💳' },
    { id: 'technical', name: 'مسائل فنی', icon: '⚙️' },
    { id: 'certificates', name: 'گواهی‌ها', icon: '🏆' }
  ];

  const helpArticles = [
    {
      id: '1',
      title: 'چگونه حساب کاربری ایجاد کنم؟',
      category: 'account',
      views: 1234,
      helpful: 89,
      content: 'راهنمای کامل ثبت‌نام و ایجاد حساب کاربری...',
      tags: ['ثبت‌نام', 'حساب کاربری', 'شروع']
    },
    {
      id: '2',
      title: 'نحوه خرید و ثبت‌نام در دوره‌ها',
      category: 'courses',
      views: 2156,
      helpful: 156,
      content: 'مراحل خرید دوره و دسترسی به محتوا...',
      tags: ['خرید', 'دوره', 'پرداخت']
    },
    {
      id: '3',
      title: 'مشکل در پرداخت آنلاین',
      category: 'payment',
      views: 987,
      helpful: 67,
      content: 'راه‌حل مشکلات رایج پرداخت...',
      tags: ['پرداخت', 'مشکل', 'درگاه']
    },
    {
      id: '4',
      title: 'دانلود گواهی پایان دوره',
      category: 'certificates',
      views: 1567,
      helpful: 134,
      content: 'نحوه دریافت و دانلود گواهی...',
      tags: ['گواهی', 'دانلود', 'مدرک']
    },
    {
      id: '5',
      title: 'مشکل در پخش ویدیو',
      category: 'technical',
      views: 876,
      helpful: 45,
      content: 'حل مشکلات پخش ویدیو و کیفیت...',
      tags: ['ویدیو', 'پخش', 'کیفیت']
    },
    {
      id: '6',
      title: 'تغییر رمز عبور',
      category: 'account',
      views: 654,
      helpful: 78,
      content: 'نحوه تغییر و بازیابی رمز عبور...',
      tags: ['رمز عبور', 'امنیت', 'تغییر']
    }
  ];

  const quickActions = [
    {
      title: 'شروع سریع',
      description: 'راهنمای گام به گام برای تازه‌واردها',
      icon: Play,
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'راهنمای کامل',
      description: 'دانلود راهنمای PDF کامل سایت',
      icon: Download,
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'ویدیوهای آموزشی',
      description: 'مشاهده ویدیوهای راهنما',
      icon: Play,
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'انجمن کاربران',
      description: 'پرسش از سایر کاربران',
      icon: Users,
      color: 'bg-yellow-500/20 text-yellow-400'
    }
  ];

  const supportChannels = [
    {
      title: 'چت آنلاین',
      description: 'پاسخ فوری به سوالات شما',
      icon: MessageCircle,
      availability: '۲۴/۷',
      responseTime: 'فوری',
      color: 'bg-green-500'
    },
    {
      title: 'تماس تلفنی',
      description: 'گفتگوی مستقیم با پشتیبانی',
      icon: Phone,
      availability: '۹-۱۸',
      responseTime: 'فوری',
      color: 'bg-blue-500'
    },
    {
      title: 'ایمیل پشتیبانی',
      description: 'ارسال سوال تفصیلی',
      icon: Mail,
      availability: '۲۴/۷',
      responseTime: '۲-۴ ساعت',
      color: 'bg-purple-500'
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">مرکز راهنمایی</h1>
        <p className="text-xl text-gray-400">
          پاسخ سوالات خود را پیدا کنید یا با پشتیبانی ما تماس بگیرید
        </p>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="سوال خود را جستجو کنید..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {quickActions.map((action, index) => (
          <div key={index} className="glass rounded-xl p-6 card-hover cursor-pointer">
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">{action.title}</h3>
            <p className="text-gray-400 text-sm">{action.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">دسته‌بندی‌ها</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Articles */}
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">مقالات راهنما</h2>
            
            {filteredArticles.length > 0 ? (
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 hover:text-purple-400">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {article.content}
                        </p>
                        
                        <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-400 mb-3">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <span>👁</span>
                            <span>{article.views.toLocaleString('fa')} بازدید</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <span>👍</span>
                            <span>{article.helpful} مفید</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 mr-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">مقاله‌ای یافت نشد</h3>
                <p className="text-gray-400">لطفا کلمات جستجو را تغییر دهید</p>
              </div>
            )}
          </div>

          {/* Support Channels */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">راه‌های تماس با پشتیبانی</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-6 text-center">
                  <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <channel.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{channel.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-400 mb-4">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <Clock className="h-3 w-3" />
                      <span>دسترسی: {channel.availability}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span>⚡</span>
                      <span>پاسخ: {channel.responseTime}</span>
                    </div>
                  </div>
                  
                  <button className="w-full glow-button py-2 rounded-lg text-sm font-medium">
                    شروع گفتگو
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 glass rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">سوالات پرتکرار</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">چگونه می‌توانم دوره خریداری شده را مشاهده کنم؟</h3>
              <p className="text-gray-400 text-sm">
                پس از ورود به حساب کاربری، به بخش "دوره‌های من" در داشبورد مراجعه کنید.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">آیا امکان بازگشت وجه وجود دارد؟</h3>
              <p className="text-gray-400 text-sm">
                بله، تا ۳۰ روز پس از خرید می‌توانید درخواست بازگشت وجه دهید.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">چگونه گواهی دریافت کنم؟</h3>
              <p className="text-gray-400 text-sm">
                پس از تکمیل ۱۰۰٪ دوره، گواهی در داشبورد شما قابل دانلود خواهد بود.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">آیا دوره‌ها زمان انقضا دارند؟</h3>
              <p className="text-gray-400 text-sm">
                خیر، پس از خرید دسترسی مادام‌العمر به دوره خواهید داشت.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">چگونه با مدرس ارتباط برقرار کنم؟</h3>
              <p className="text-gray-400 text-sm">
                در هر دوره بخش سوال و جواب وجود دارد که می‌توانید سوالات خود را مطرح کنید.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">آیا تخفیف دانشجویی دارید؟</h3>
              <p className="text-gray-400 text-sm">
                بله، دانشجویان با ارائه کارت دانشجویی معتبر ۲۰٪ تخفیف دریافت می‌کنند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPage;
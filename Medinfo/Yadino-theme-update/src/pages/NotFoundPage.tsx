import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  const popularPages = [
    { title: 'دوره‌های آموزشی', href: '/courses', icon: '📚' },
    { title: 'وبلاگ', href: '/blog', icon: '📝' },
    { title: 'درباره ما', href: '/about', icon: '👥' },
    { title: 'تماس با ما', href: '/contact', icon: '📞' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 rtl">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-9xl md:text-[12rem] font-bold text-gradient opacity-50 animate-float">
            ۴۰۴
          </div>
        </div>

        {/* Error Message */}
        <div className="glass rounded-xl p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            صفحه مورد نظر یافت نشد!
          </h1>
          <p className="text-xl text-gray-400 mb-6 leading-relaxed">
            متاسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا ممکن است آدرس آن تغییر کرده باشد.
          </p>
          <p className="text-gray-400 mb-8">
            نگران نباشید! می‌توانید از لینک‌های زیر برای پیدا کردن آنچه دنبالش هستید استفاده کنید.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="glow-button px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Home className="h-5 w-5" />
              <span>بازگشت به خانه</span>
            </Link>
            
            <Link
              to="/courses"
              className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Search className="h-5 w-5" />
              <span>جستجو در دوره‌ها</span>
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">صفحات پرطرفدار</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularPages.map((page, index) => (
              <Link
                key={index}
                to={page.href}
                className="flex items-center space-x-3 space-x-reverse p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">{page.icon}</span>
                <span className="font-medium">{page.title}</span>
                <ArrowLeft className="h-4 w-4 mr-auto" />
              </Link>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center space-x-2 space-x-reverse"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>بازگشت به صفحه قبل</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
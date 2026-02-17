import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft, Calendar, CreditCard } from 'lucide-react';

function PaymentSuccessPage() {
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <h1 className="text-3xl font-bold mb-4">صفحه‌ای یافت نشد</h1>
        <Link to="/" className="text-purple-400 hover:text-purple-300">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-green-400">پرداخت موفق!</h1>
        <p className="text-xl text-gray-400">
          از خرید شما متشکریم. به جمع دانشجویان ما خوش آمدید!
        </p>
      </div>

      {/* Order Details */}
      <div className="glass rounded-xl p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">جزئیات سفارش</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">شماره سفارش</div>
                  <div className="font-semibold">{orderData.orderNumber}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">مبلغ پرداختی</div>
                  <div className="font-semibold text-purple-400">
                    {Math.round(orderData.amount * 1.09).toLocaleString('fa')} تومان
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">تاریخ خرید</div>
                  <div className="font-semibold">
                    {new Date().toLocaleDateString('fa-IR')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">مراحل بعدی</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ۱
                </div>
                <div>
                  <div className="font-medium">دسترسی فوری</div>
                  <div className="text-gray-400 text-sm">
                    دوره‌های خریداری شده در داشبورد شما قابل دسترسی است
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ۲
                </div>
                <div>
                  <div className="font-medium">شروع یادگیری</div>
                  <div className="text-gray-400 text-sm">
                    می‌توانید همین حالا شروع به یادگیری کنید
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ۳
                </div>
                <div>
                  <div className="font-medium">دریافت گواهی</div>
                  <div className="text-gray-400 text-sm">
                    پس از اتمام دوره، گواهی معتبر دریافت کنید
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchased Courses */}
      <div className="glass rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">دوره‌های خریداری شده</h2>
        <div className="space-y-4">
          {orderData.courses.map((course: any) => (
            <div key={course.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-white/5 rounded-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-20 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-gray-400 text-sm">مدرس: {course.instructor}</p>
              </div>
              <div className="text-purple-400 font-semibold">
                {course.price.toLocaleString('fa')} تومان
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/dashboard"
          className="glow-button px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center space-x-2 space-x-reverse"
        >
          <span>رفتن به داشبورد</span>
          <ArrowLeft className="h-5 w-5" />
        </Link>
        
        <button className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
          <Download className="h-5 w-5" />
          <span>دانلود فاکتور</span>
        </button>
        
        <Link
          to="/courses"
          className="glass px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/10 transition-colors"
        >
          خرید دوره‌های بیشتر
        </Link>
      </div>

      {/* Support Info */}
      <div className="text-center mt-12 glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">نیاز به کمک دارید؟</h3>
        <p className="text-gray-400 mb-4">
          تیم پشتیبانی ما ۲۴ ساعته آماده کمک به شما است
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            تماس با پشتیبانی
          </Link>
          <Link
            to="/faq"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            سوالات متداول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
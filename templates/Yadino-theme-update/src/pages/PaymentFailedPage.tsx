import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, CreditCard, Phone } from 'lucide-react';

function PaymentFailedPage() {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate('/checkout');
  };

  const commonIssues = [
    {
      icon: CreditCard,
      title: 'اطلاعات کارت',
      description: 'شماره کارت، تاریخ انقضا یا CVV اشتباه وارد شده باشد'
    },
    {
      icon: '💰',
      title: 'موجودی ناکافی',
      description: 'موجودی کارت شما برای انجام این تراکنش کافی نباشد'
    },
    {
      icon: '🏦',
      title: 'محدودیت بانکی',
      description: 'کارت شما برای خرید اینترنتی فعال نباشد'
    },
    {
      icon: '🌐',
      title: 'مشکل شبکه',
      description: 'مشکل موقت در اتصال به درگاه پرداخت'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Error Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-red-400">پرداخت ناموفق!</h1>
        <p className="text-xl text-gray-400">
          متاسفانه پرداخت شما انجام نشد. لطفا دوباره تلاش کنید.
        </p>
      </div>

      {/* Error Details */}
      <div className="glass rounded-xl p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">چه اتفاقی افتاده؟</h2>
          <p className="text-gray-400 leading-relaxed">
            پرداخت شما به دلایل مختلفی ممکن است ناموفق باشد. در ادامه دلایل محتمل و راه‌حل‌ها را مشاهده کنید.
          </p>
        </div>

        {/* Common Issues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {commonIssues.map((issue, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  {typeof issue.icon === 'string' ? (
                    <span className="text-xl">{issue.icon}</span>
                  ) : (
                    <issue.icon className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{issue.title}</h3>
                  <p className="text-gray-400 text-sm">{issue.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetryPayment}
            className="glow-button px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 space-x-reverse"
          >
            <RefreshCw className="h-5 w-5" />
            <span>تلاش مجدد</span>
          </button>
          
          <Link
            to="/cart"
            className="glass px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/10 transition-colors"
          >
            بازگشت به سبد خرید
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="glass rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">راه‌حل‌های پیشنهادی</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold">بررسی اطلاعات کارت</h3>
            <p className="text-gray-400 text-sm">
              شماره کارت، تاریخ انقضا و CVV را دوباره بررسی کنید
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
              <Phone className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold">تماس با بانک</h3>
            <p className="text-gray-400 text-sm">
              با بانک صادرکننده کارت تماس بگیرید
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xl">💳</span>
            </div>
            <h3 className="font-semibold">کارت دیگر</h3>
            <p className="text-gray-400 text-sm">
              از کارت بانکی دیگری استفاده کنید
            </p>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="glass rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">همچنان مشکل دارید؟</h3>
        <p className="text-gray-400 mb-6">
          تیم پشتیبانی ما آماده کمک به شما است
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="glow-button px-6 py-3 rounded-lg font-semibold"
          >
            تماس با پشتیبانی
          </Link>
          <a
            href="tel:+989123456789"
            className="glass px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            ۰۹۱۲-۳۴۵-۶۷۸۹
          </a>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center space-x-2 space-x-reverse"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
}

export default PaymentFailedPage;
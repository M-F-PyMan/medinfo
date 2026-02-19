import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, Calendar, CreditCard } from "lucide-react";

function PaymentSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">

      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-green-400">
          پرداخت موفق!
        </h1>

        <p className="text-xl text-gray-400">
          پرداخت شما با موفقیت انجام شد.
          دوره‌های خریداری‌شده اکنون در داشبورد شما قابل مشاهده هستند.
        </p>
      </div>

      {/* Info Box */}
      <div className="glass rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">اطلاعات پرداخت</h2>

        <div className="space-y-4">

          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">تاریخ پرداخت</div>
              <div className="font-semibold">
                {new Date().toLocaleDateString("fa-IR")}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">وضعیت</div>
              <div className="font-semibold text-green-400">پرداخت موفق</div>
            </div>
          </div>

        </div>
      </div>

      {/* Next Steps */}
      <div className="glass rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">مراحل بعدی</h2>

        <div className="space-y-4">

          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              ۱
            </div>
            <div>
              <div className="font-medium">دسترسی فوری</div>
              <div className="text-gray-400 text-sm">
                دوره‌های خریداری‌شده در داشبورد شما قابل مشاهده هستند.
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
                می‌توانید همین حالا شروع به یادگیری کنید.
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
                پس از اتمام دوره، گواهی معتبر دریافت خواهید کرد.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/dashboard"
          className="glow-button px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center space-x-2 space-x-reverse"
        >
          <span>رفتن به داشبورد</span>
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <Link
          to="/courses"
          className="glass px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/10 transition-colors"
        >
          خرید دوره‌های بیشتر
        </Link>
      </div>

    </div>
  );
}

export default PaymentSuccessPage;

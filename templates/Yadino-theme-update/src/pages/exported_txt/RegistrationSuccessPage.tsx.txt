import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Rocket } from 'lucide-react';

function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 rtl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 space-x-reverse text-2xl font-bold text-gradient mb-8">
            <span>یادینو</span>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        <div className="glass rounded-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">ثبت‌نام با موفقیت انجام شد!</h2>
            <p className="text-gray-400">
              به یادینو خوش آمدید. حالا می‌توانید از دوره‌های آموزشی ما استفاده کنید.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/courses"
              className="w-full glow-button py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Rocket className="h-5 w-5" />
              <span>شروع یادگیری</span>
            </Link>

            <Link
              to="/dashboard"
              className="w-full glass py-3 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300 block"
            >
              ورود به داشبورد
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              سوالی دارید؟{' '}
              <Link to="/contact" className="text-purple-400 hover:text-purple-300 font-medium">
                با ما تماس بگیرید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccessPage;

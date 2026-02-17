import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft } from 'lucide-react';

function RegisterPageNew() {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (phone && phone.length >= 11) {
        // شبیه‌سازی ارسال کد تایید
        setTimeout(() => {
          navigate('/verify-code', { state: { phone } });
        }, 1000);
      } else {
        setError('لطفا شماره موبایل معتبر وارد کنید');
      }
    } catch (err) {
      setError('خطایی رخ داده است. لطفا دوباره تلاش کنید');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 rtl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 space-x-reverse text-2xl font-bold text-gradient mb-8">
            <span>یادینو</span>
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h2 className="text-3xl font-bold mb-2 text-white">ثبت‌نام</h2>
          <p className="text-gray-400">برای شروع یادگیری ثبت‌نام کنید</p>
        </div>

        <div className="glass rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">
                شماره موبایل
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 phone-input"
                  placeholder=""
                  dir="ltr"
                  maxLength={11}
                  style={{
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    textAlign: 'left',
                    direction: 'ltr'
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                کد تایید به این شماره ارسال خواهد شد
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full glow-button py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'در حال ارسال...' : 'ارسال کد تایید'}
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link to="/login-new" className="text-purple-400 hover:text-purple-300 font-medium">
                  ورود کنید
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageNew;

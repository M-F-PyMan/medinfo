import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function VerifyCodePage() {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';
  const { register } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    // فقط اعداد مجاز هستند
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // اگر کاراکتر وارد شد، به باکس بعدی برو
      if (value && index < 3) {
        setTimeout(() => {
          const nextInput = document.getElementById(`code-${index + 1}`);
          if (nextInput) {
            nextInput.focus();
          }
        }, 10);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // اگر backspace زد و باکس خالی بود، به باکس قبلی برو
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      setError('لطفا کد ۴ رقمی را کامل وارد کنید');
      setIsLoading(false);
      return;
    }

    try {
      // شبیه‌سازی تایید کد
      if (fullCode === '1234') { // کد دمو
        const success = await register(phone);
        if (success) {
          navigate('/registration-success');
        } else {
          setError('خطا در ثبت‌نام. لطفا دوباره تلاش کنید');
        }
      } else {
        setError('کد وارد شده اشتباه است');
      }
      setIsLoading(false);
    } catch (err) {
      setError('خطایی رخ داده است. لطفا دوباره تلاش کنید');
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(120);
    setCanResend(false);
    setCode(['', '', '', '']);
    setError('');
    // در اینجا می‌توانید API ارسال مجدد کد را فراخوانی کنید
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 rtl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/register-new" className="inline-flex items-center space-x-2 space-x-reverse text-2xl font-bold text-gradient mb-8">
            <span>یادینو</span>
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h2 className="text-3xl font-bold mb-2 text-white">تایید شماره موبایل</h2>
          <p className="text-gray-400">
            کد تایید به شماره <span className="text-purple-400 font-medium">{phone}</span> ارسال شد
          </p>
        </div>

        <div className="glass rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-4 text-white text-center">
                کد ۴ رقمی را وارد کنید
              </label>
                             <div className="flex justify-center gap-4" dir="ltr">
                 {code.map((digit, index) => (
                   <input
                     key={index}
                     id={`code-${index}`}
                     type="text"
                     inputMode="numeric"
                     maxLength={1}
                     value={digit}
                     onChange={(e) => handleCodeChange(index, e.target.value)}
                     onKeyDown={(e) => handleKeyDown(index, e)}
                     className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 verify-code-input courier-font"
                                            style={{
                         direction: 'ltr',
                         textAlign: 'center',
                         unicodeBidi: 'plaintext',
                         writingMode: 'horizontal-tb',
                         fontFamily: 'Vazir, sans-serif !important',
                         fontSize: '18px !important',
                         fontWeight: '700 !important',
                         letterSpacing: '2px !important',
                         fontStyle: 'normal',
                         fontVariant: 'normal',
                         textTransform: 'none',
                         lineHeight: '1'
                       }}
                   />
                 ))}
               </div>
               <div className="text-center mt-4">
                 <p className="text-red-400 text-sm font-medium">
                   کد ۱۲۳۴ را وارد کنید
                 </p>
               </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-400">
                {timeLeft > 0 ? (
                  <>ارسال مجدد کد تا {formatTime(timeLeft)} دیگر</>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full glow-button py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'در حال تایید...' : 'تایید کد'}
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                شماره اشتباه است؟{' '}
                <Link to="/register-new" className="text-purple-400 hover:text-purple-300 font-medium">
                  تغییر شماره
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyCodePage;

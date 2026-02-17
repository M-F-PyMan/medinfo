import React, { useState } from 'react';
import { Mail, Bell, Gift, CheckCircle, Users, TrendingUp, BookOpen, Star } from 'lucide-react';

function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = [
    { id: 'programming', name: 'برنامه‌نویسی', icon: '💻' },
    { id: 'design', name: 'طراحی', icon: '🎨' },
    { id: 'marketing', name: 'مارکتینگ', icon: '📈' },
    { id: 'business', name: 'کسب‌وکار', icon: '💼' },
    { id: 'ai', name: 'هوش مصنوعی', icon: '🤖' },
    { id: 'mobile', name: 'موبایل', icon: '📱' }
  ];

  const benefits = [
    {
      icon: Gift,
      title: 'تخفیف‌های اختصاصی',
      description: 'تا ۵۰٪ تخفیف روی دوره‌های جدید فقط برای اعضای خبرنامه'
    },
    {
      icon: Bell,
      title: 'اطلاع از دوره‌های جدید',
      description: 'اولین نفری باشید که از دوره‌های جدید با خبر می‌شوید'
    },
    {
      icon: BookOpen,
      title: 'محتوای رایگان',
      description: 'دسترسی به مقالات، ویدیوها و منابع آموزشی رایگان'
    },
    {
      icon: Users,
      title: 'دعوت به وبینارها',
      description: 'شرکت رایگان در وبینارهای آموزشی و جلسات Q&A'
    }
  ];

  const stats = [
    { number: '۲۵,۰۰۰+', label: 'عضو فعال' },
    { number: '۹۸٪', label: 'رضایت اعضا' },
    { number: '۳ بار', label: 'در هفته' },
    { number: '۵۰+', label: 'تخفیف ویژه' }
  ];

  const handleInterestToggle = (interestId: string) => {
    setInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && interests.length > 0) {
      setIsSubscribed(true);
    }
  };

  if (isSubscribed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <div className="glass rounded-xl p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-green-400">عضویت موفق!</h1>
          <p className="text-xl text-gray-400 mb-6">
            از عضویت شما در خبرنامه یادینو متشکریم
          </p>
          <p className="text-gray-300 mb-8">
            اولین ایمیل خبرنامه تا چند دقیقه دیگر برای شما ارسال خواهد شد.
            لطفا پوشه اسپم خود را نیز بررسی کنید.
          </p>
          <div className="bg-purple-500/20 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">🎁 هدیه خوش‌آمدگویی</h3>
            <p className="text-sm text-gray-300">
              کد تخفیف ۲۰٪ برای اولین خرید شما: <span className="font-mono bg-white/10 px-2 py-1 rounded">WELCOME20</span>
            </p>
          </div>
          <button
            onClick={() => setIsSubscribed(false)}
            className="glow-button px-6 py-3 rounded-lg font-semibold"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">عضویت در خبرنامه</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          با عضویت در خبرنامه ما، از آخرین اخبار، تخفیف‌های ویژه و محتوای آموزشی رایگان باخبر شوید
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="glass rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{stat.number}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Subscription Form */}
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">عضویت در خبرنامه</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">ایمیل شما</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">علاقه‌مندی‌های شما:</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg cursor-pointer transition-colors ${
                      interests.includes(category.id)
                        ? 'bg-purple-500/20 border border-purple-500'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={interests.includes(category.id)}
                      onChange={() => handleInterestToggle(category.id)}
                      className="sr-only"
                    />
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
              {interests.length === 0 && (
                <p className="text-red-400 text-sm mt-2">لطفا حداقل یک علاقه‌مندی انتخاب کنید</p>
              )}
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-gray-300 bg-white/5 border-white/10"
                />
                <div className="text-sm text-gray-300">
                  با عضویت در خبرنامه، شما با{' '}
                  <a href="/terms" className="text-purple-400 hover:text-purple-300">
                    قوانین و مقررات
                  </a>{' '}
                  و{' '}
                  <a href="/privacy" className="text-purple-400 hover:text-purple-300">
                    سیاست حفظ حریم خصوصی
                  </a>{' '}
                  ما موافقت می‌کنید.
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!email || interests.length === 0}
              className="w-full glow-button py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              عضویت در خبرنامه
            </button>
          </form>
        </div>

        {/* Benefits */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">مزایای عضویت</h2>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass rounded-lg p-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sample Newsletter */}
          <div className="glass rounded-lg p-6">
            <h3 className="font-semibold mb-4">نمونه خبرنامه</h3>
            <div className="bg-white/5 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">دوره جدید React Native</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Gift className="h-4 w-4 text-green-400" />
                <span className="text-sm">تخفیف ۴۰٪ ویژه اعضای خبرنامه</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="text-sm">مقاله: ۱۰ نکته طلایی JavaScript</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="text-sm">وبینار: آینده توسعه وب</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 glass rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">سوالات متداول</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">چند بار در هفته ایمیل دریافت می‌کنم؟</h3>
            <p className="text-gray-400 text-sm">
              معمولا ۲-۳ بار در هفته ایمیل ارسال می‌کنیم. شما می‌توانید تنظیمات دریافت را تغییر دهید.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">آیا می‌توانم لغو عضویت کنم؟</h3>
            <p className="text-gray-400 text-sm">
              بله، در هر زمان می‌توانید با کلیک روی لینک لغو عضویت در پایین ایمیل‌ها، عضویت خود را لغو کنید.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">اطلاعات من محفوظ است؟</h3>
            <p className="text-gray-400 text-sm">
              ما هرگز اطلاعات شما را با اشخاص ثالث به اشتراک نمی‌گذاریم و از بالاترین استانداردهای امنیتی استفاده می‌کنیم.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">چه نوع محتوایی دریافت می‌کنم؟</h3>
            <p className="text-gray-400 text-sm">
              اخبار دوره‌های جدید، تخفیف‌های ویژه، مقالات آموزشی، نکات کاربردی و دعوت به وبینارها.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterPage;
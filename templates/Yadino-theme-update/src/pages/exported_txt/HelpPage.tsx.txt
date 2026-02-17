import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, BookOpen, CreditCard, MessageCircle, Settings, Download, Video, FileText, HelpCircle, Search } from 'lucide-react';

function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('account');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    { id: 'account', name: 'حساب کاربری', icon: User },
    { id: 'courses', name: 'دوره‌ها', icon: BookOpen },
    { id: 'payment', name: 'پرداخت', icon: CreditCard },
    { id: 'support', name: 'پشتیبانی', icon: MessageCircle },
    { id: 'technical', name: 'مشکلات فنی', icon: Settings }
  ];

  const faqData = {
    account: [
      {
        id: 'account-1',
        question: 'چگونه حساب کاربری ایجاد کنم؟',
        answer: `برای ایجاد حساب کاربری مراحل زیر را دنبال کنید:

1. روی دکمه "ثبت‌نام" در بالای صفحه کلیک کنید
2. اطلاعات شخصی خود را وارد کنید (نام، ایمیل، رمز عبور)
3. کد تایید ارسال شده به ایمیل را وارد کنید
4. روی "تایید و تکمیل ثبت‌نام" کلیک کنید
5. پروفایل خود را تکمیل کنید

نکات مهم:
• از ایمیل معتبر استفاده کنید
• رمز عبور قوی انتخاب کنید (حداقل 8 کاراکتر)
• شماره موبایل خود را برای بازیابی رمز عبور وارد کنید`
      },
      {
        id: 'account-2',
        question: 'چگونه رمز عبور خود را تغییر دهم؟',
        answer: `برای تغییر رمز عبور:

1. وارد حساب کاربری خود شوید
2. به بخش "تنظیمات پروفایل" بروید
3. روی "تغییر رمز عبور" کلیک کنید
4. رمز عبور فعلی را وارد کنید
5. رمز عبور جدید را وارد کنید
6. رمز عبور جدید را تکرار کنید
7. روی "ذخیره تغییرات" کلیک کنید

در صورت فراموشی رمز عبور:
• روی "فراموشی رمز عبور" کلیک کنید
• ایمیل خود را وارد کنید
• لینک بازیابی ارسال شده را دنبال کنید`
      },
      {
        id: 'account-3',
        question: 'چگونه پروفایل خود را ویرایش کنم؟',
        answer: `برای ویرایش پروفایل:

1. وارد حساب کاربری خود شوید
2. روی نام کاربری در بالای صفحه کلیک کنید
3. "ویرایش پروفایل" را انتخاب کنید
4. اطلاعات مورد نظر را تغییر دهید:
   • نام و نام خانوادگی
   • تصویر پروفایل
   • بیوگرافی
   • مهارت‌ها
   • شبکه‌های اجتماعی
5. روی "ذخیره تغییرات" کلیک کنید`
      }
    ],
    courses: [
      {
        id: 'courses-1',
        question: 'چگونه در دوره‌ها ثبت‌نام کنم؟',
        answer: `برای ثبت‌نام در دوره‌ها:

1. دوره مورد نظر خود را پیدا کنید
2. روی "ثبت‌نام در دوره" کلیک کنید
3. روش پرداخت را انتخاب کنید:
   • کارت بانکی
   • کیف پول
   • کد تخفیف
4. اطلاعات پرداخت را وارد کنید
5. روی "پرداخت و ثبت‌نام" کلیک کنید
6. پس از تایید پرداخت، دوره در پروفایل شما اضافه می‌شود

نکات مهم:
• قبل از ثبت‌نام، پیش‌نمایش دوره را مشاهده کنید
• از کدهای تخفیف معتبر استفاده کنید
• در صورت مشکل، با پشتیبانی تماس بگیرید`
      },
      {
        id: 'courses-2',
        question: 'چگونه به محتوای دوره دسترسی پیدا کنم؟',
        answer: `پس از ثبت‌نام در دوره:

1. وارد حساب کاربری خود شوید
2. به بخش "دوره‌های من" بروید
3. روی دوره مورد نظر کلیک کنید
4. از فهرست درس‌ها، درس مورد نظر را انتخاب کنید
5. ویدیو یا محتوای درس را مشاهده کنید

امکانات موجود:
• دانلود محتوا برای مشاهده آفلاین
• یادداشت‌برداری
• پرسش و پاسخ
• آزمون‌های دوره
• گواهینامه پایان دوره`
      },
      {
        id: 'courses-3',
        question: 'چگونه پیشرفت خود را مشاهده کنم؟',
        answer: `برای مشاهده پیشرفت:

1. وارد حساب کاربری خود شوید
2. به بخش "دوره‌های من" بروید
3. روی دوره مورد نظر کلیک کنید
4. در صفحه دوره، بخش "پیشرفت" را مشاهده کنید

اطلاعات نمایش داده شده:
• درصد تکمیل دوره
• تعداد درس‌های مشاهده شده
• زمان صرف شده
• نمره آزمون‌ها
• گواهینامه‌های دریافت شده`
      }
    ],
    payment: [
      {
        id: 'payment-1',
        question: 'چه روش‌های پرداختی پشتیبانی می‌شود؟',
        answer: `روش‌های پرداخت موجود:

• کارت‌های بانکی (شتاب و بین‌المللی)
• کیف پول الکترونیکی
• پرداخت آنلاین
• کدهای تخفیف
• هدیه‌های آموزشی

نکات مهم:
• تمام پرداخت‌ها امن و رمزگذاری شده هستند
• رسید پرداخت به ایمیل ارسال می‌شود
• در صورت مشکل، تا 24 ساعت امکان بازگشت وجه وجود دارد`
      },
      {
        id: 'payment-2',
        question: 'چگونه کد تخفیف استفاده کنم؟',
        answer: `برای استفاده از کد تخفیف:

1. دوره مورد نظر را انتخاب کنید
2. روی "ثبت‌نام در دوره" کلیک کنید
3. در صفحه پرداخت، روی "کد تخفیف" کلیک کنید
4. کد تخفیف خود را وارد کنید
5. روی "اعمال تخفیف" کلیک کنید
6. مبلغ جدید را مشاهده کنید
7. پرداخت را تکمیل کنید

نکات مهم:
• کدهای تخفیف تاریخ انقضا دارند
• هر کد فقط یک بار قابل استفاده است
• کدهای تخفیف قابل ترکیب نیستند`
      }
    ],
    support: [
      {
        id: 'support-1',
        question: 'چگونه با پشتیبانی تماس بگیرم؟',
        answer: `روش‌های تماس با پشتیبانی:

• چت آنلاین: 24/7 در دسترس
• ایمیل: support@yadino.com
• تلفن: 021-12345678
• تلگرام: @yadino_support

ساعات کاری:
شنبه تا چهارشنبه: 8 صبح تا 8 شب
پنجشنبه: 8 صبح تا 5 عصر

برای دریافت پاسخ سریع‌تر:
• شماره سفارش یا کد پیگیری را ذکر کنید
• مشکل خود را به طور دقیق توضیح دهید
• تصاویر مربوطه را ارسال کنید`
      },
      {
        id: 'support-2',
        question: 'چگونه مشکل فنی خود را گزارش دهم؟',
        answer: `برای گزارش مشکل فنی:

1. وارد حساب کاربری خود شوید
2. به بخش "پشتیبانی" بروید
3. "گزارش مشکل" را انتخاب کنید
4. نوع مشکل را انتخاب کنید:
   • مشکل در پخش ویدیو
   • مشکل در دانلود
   • مشکل در ورود
   • مشکل در پرداخت
5. جزئیات مشکل را توضیح دهید
6. تصاویر یا فایل‌های مربوطه را آپلود کنید
7. روی "ارسال گزارش" کلیک کنید

پشتیبانی در کمترین زمان ممکن پاسخ خواهد داد.`
      }
    ],
    technical: [
      {
        id: 'technical-1',
        question: 'چرا ویدیوها پخش نمی‌شوند؟',
        answer: `راه‌حل‌های مشکل پخش ویدیو:

1. بررسی اتصال اینترنت:
   • سرعت اینترنت حداقل 2 مگابیت بر ثانیه باشد
   • از VPN استفاده نکنید

2. پاک کردن کش مرورگر:
   • Ctrl + Shift + Delete
   • کش و کوکی‌ها را پاک کنید

3. بروزرسانی مرورگر:
   • از آخرین نسخه Chrome، Firefox یا Safari استفاده کنید

4. غیرفعال کردن افزونه‌ها:
   • افزونه‌های مسدودکننده تبلیغات را غیرفعال کنید

5. تغییر مرورگر:
   • مرورگر دیگری را امتحان کنید

اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید.`
      },
      {
        id: 'technical-2',
        question: 'چگونه محتوا را دانلود کنم؟',
        answer: `برای دانلود محتوا:

1. وارد حساب کاربری خود شوید
2. به دوره مورد نظر بروید
3. کنار هر درس، دکمه دانلود را کلیک کنید
4. فایل‌ها در پوشه Downloads ذخیره می‌شوند

نکات مهم:
• دانلود فقط برای اعضای ثبت‌نام شده امکان‌پذیر است
• فایل‌ها با فرمت MP4 و PDF هستند
• حجم فایل‌ها بسته به کیفیت متفاوت است
• برای مشاهده آفلاین، فایل‌ها را در دستگاه خود ذخیره کنید

محدودیت‌ها:
• حداکثر 5 دانلود همزمان
• فایل‌ها فقط برای استفاده شخصی هستند
• اشتراک فایل‌ها ممنوع است`
      }
    ]
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredData = faqData[activeCategory as keyof typeof faqData].filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">مرکز راهنمایی</h1>
        <p className="text-xl text-gray-400">
          پاسخ سوالات متداول و راهنمای استفاده از یادینو
        </p>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-4 sm:p-6 mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در راهنما..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">دسته‌بندی‌ها</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors text-right ${
                    activeCategory === category.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="lg:col-span-3">
          <div className="glass rounded-xl p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-6">
              {categories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            
            <div className="space-y-4">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div key={item.id} className="border border-white/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between p-4 text-right hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-sm sm:text-base">{item.question}</span>
                      {expandedItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
                  <p className="text-gray-400">لطفا کلمات جستجو را تغییر دهید</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <MessageCircle className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">چت پشتیبانی</h3>
              <p className="text-gray-400 text-sm mb-3">سوال خود را مستقیماً بپرسید</p>
              <button className="glow-button px-4 py-2 rounded-lg text-sm">
                شروع چت
              </button>
            </div>
            
            <div className="glass rounded-xl p-4 text-center">
              <Video className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">ویدیو راهنما</h3>
              <p className="text-gray-400 text-sm mb-3">آموزش تصویری استفاده</p>
              <button className="glow-button px-4 py-2 rounded-lg text-sm">
                مشاهده ویدیوها
              </button>
            </div>
            
            <div className="glass rounded-xl p-4 text-center">
              <FileText className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">دانلود راهنما</h3>
              <p className="text-gray-400 text-sm mb-3">راهنمای کامل PDF</p>
              <button className="glow-button px-4 py-2 rounded-lg text-sm">
                دانلود
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;

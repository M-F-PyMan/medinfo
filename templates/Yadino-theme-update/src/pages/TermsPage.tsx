import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Users, CreditCard, ArrowLeft } from 'lucide-react';

function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: 'شرایط عضویت',
      content: `
        <p>برای استفاده از خدمات یادینو، باید حداقل ۱۸ سال سن داشته باشید یا با اجازه والدین یا سرپرست قانونی خود عمل کنید.</p>
        <p>هنگام ثبت‌نام، باید اطلاعات صحیح و کامل ارائه دهید و مسئولیت حفظ محرمانگی نام کاربری و رمز عبور خود را بپذیرید.</p>
        <p>هر کاربر تنها مجاز به داشتن یک حساب کاربری است.</p>
      `
    },
    {
      icon: FileText,
      title: 'محتوای آموزشی',
      content: `
        <p>تمامی محتوای آموزشی ارائه شده در پلتفرم متعلق به یادینو است و تحت قوانین کپی‌رایت محافظت می‌شود.</p>
        <p>کاربران مجاز به استفاده شخصی از محتوا هستند اما حق توزیع، فروش یا استفاده تجاری بدون اجازه کتبی را ندارند.</p>
        <p>ضبط، کپی یا تکثیر محتوای دوره‌ها بدون مجوز ممنوع است.</p>
      `
    },
    {
      icon: CreditCard,
      title: 'پرداخت و بازپرداخت',
      content: `
        <p>تمامی پرداخت‌ها از طریق درگاه‌های بانکی معتبر انجام می‌شود و اطلاعات مالی شما محفوظ است.</p>
        <p>پس از خرید موفق، دسترسی فوری به دوره ارائه می‌شود.</p>
        <p>در صورت عدم رضایت، تا ۳۰ روز پس از خرید امکان بازگشت وجه وجود دارد.</p>
        <p>برای بازپرداخت باید درخواست خود را از طریق پشتیبانی ارسال کنید.</p>
      `
    },
    {
      icon: Shield,
      title: 'حریم خصوصی',
      content: `
        <p>ما متعهد به حفظ حریم خصوصی کاربران هستیم و اطلاعات شخصی شما را با اشخاص ثالث به اشتراک نمی‌گذاریم.</p>
        <p>اطلاعات جمع‌آوری شده تنها برای بهبود خدمات و ارائه تجربه بهتر استفاده می‌شود.</p>
        <p>شما حق دسترسی، ویرایش یا حذف اطلاعات شخصی خود را دارید.</p>
      `
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">قوانین و مقررات</h1>
        <p className="text-xl text-gray-400">
          با استفاده از خدمات یادینو، شما این قوانین را می‌پذیرید
        </p>
        <div className="text-sm text-gray-400 mt-4">
          آخرین به‌روزرسانی: ۱۴۰۳/۰۸/۰۱
        </div>
      </div>

      {/* Introduction */}
      <div className="glass rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">مقدمه</h2>
        <p className="text-gray-300 leading-relaxed">
          خوش آمدید! این سند شامل قوانین و مقررات استفاده از وب‌سایت و خدمات یادینو است.
          با ثبت‌نام، خرید دوره یا استفاده از هر بخش از سایت، شما موافقت خود را با این قوانین اعلام می‌کنید.
          لطفا این متن را با دقت مطالعه کنید.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="glass rounded-xl p-8">
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <section.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            </div>
            <div 
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>

      {/* Additional Terms */}
      <div className="glass rounded-xl p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">سایر موارد مهم</h2>
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">مسئولیت کاربران</h3>
            <p>کاربران باید از رفتار محترمانه در تعامل با سایر کاربران و تیم پشتیبانی پیروی کنند و از ارسال محتوای نامناسب، تهدیدآمیز یا غیرقانونی خودداری کنند.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">تغییرات قوانین</h3>
            <p>یادینو حق تغییر این قوانین را در هر زمان محفوظ می‌دارد. تغییرات مهم از طریق ایمیل یا اعلان در سایت به اطلاع کاربران خواهد رسید.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">قانون حاکم</h3>
            <p>این قوانین تحت قوانین جمهوری اسلامی ایران قرار دارد و هرگونه اختلاف در محاکم صالح تهران رسیدگی خواهد شد.</p>
          </div>
        </div>
      </div>

      {/* Contact for Questions */}
      <div className="glass rounded-xl p-6 mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">سوالی دارید؟</h3>
        <p className="text-gray-400 mb-6">
          اگر در مورد این قوانین سوالی دارید، با تیم پشتیبانی ما تماس بگیرید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="glow-button px-6 py-3 rounded-lg font-semibold"
          >
            تماس با پشتیبانی
          </Link>
          <Link
            to="/faq"
            className="glass px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            سوالات متداول
          </Link>
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

export default TermsPage;
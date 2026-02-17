import React from 'react';
import { Users, Award, BookOpen, Globe, Target, Heart, Zap } from 'lucide-react';

function AboutPage() {
  const team = [
    {
      name: 'دکتر محمد احمدی',
      role: 'مدیرعامل و بنیانگذار',
      image: '/images/pexels-photo-1043471.jpeg',
      description: 'بیش از ۱۵ سال تجربه در حوزه آموزش و تکنولوژی'
    },
    {
      name: 'سارا میرزایی',
      role: 'مدیر آموزش',
      image: '/images/pexels-photo-1239291.jpeg',
      description: 'متخصص طراحی برنامه‌های درسی و روش‌های آموزشی نوین'
    },
    {
      name: 'علی رضایی',
      role: 'مدیر فنی',
      image: '/images/pexels-photo-1222271.jpeg',
      description: 'مهندس نرم‌افزار با تجربه در طراحی پلتفرم‌های آموزشی'
    },
    {
      name: 'مریم حسینی',
      role: 'مدیر محتوا',
      image: '/images/pexels-photo-1181519.jpeg',
      description: 'کارشناس تولید محتوای آموزشی و استراتژی‌های یادگیری'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'کیفیت بالا',
      description: 'تعهد به ارائه بهترین محتوای آموزشی با استانداردهای جهانی'
    },
    {
      icon: Heart,
      title: 'علاقه به یادگیری',
      description: 'ایجاد انگیزه و علاقه به یادگیری مداوم در دانشجویان'
    },
    {
      icon: Zap,
      title: 'نوآوری',
      description: 'استفاده از جدیدترین تکنولوژی‌ها و روش‌های آموزشی'
    },
    {
      icon: Users,
      title: 'جامعه یادگیری',
      description: 'ساخت جامعه‌ای از یادگیرندگان متعهد و حرفه‌ای'
    }
  ];

  const stats = [
    { icon: Users, value: '۱۰,۰۰۰+', label: 'دانشجو فعال' },
    { icon: BookOpen, value: '۵۰۰+', label: 'دوره آموزشی' },
    { icon: Award, value: '۱۰۰+', label: 'مدرس خبره' },
    { icon: Globe, value: '۵۰+', label: 'شهر' }
  ];

  return (
    <div className="rtl">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            داستان <span className="text-gradient">یادینو</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            ما با هدف دموکراتیزه کردن آموزش و در دسترس قرار دادن یادگیری با کیفیت برای همه افراد،
            یادینو را در سال ۱۳۹۸ تاسیس کردیم.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
              <stat.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">ماموریت ما</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              ما معتقدیم که یادگیری حق همه افراد است. هدف ما ایجاد پلتفرمی است که بهترین
              آموزش‌ها را با کیفیت بالا و قیمت مناسب در اختیار همه قرار دهد.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              تیم ما متشکل از متخصصان با تجربه در حوزه‌های مختلف است که با علم و تجربه خود،
              مسیر یادگیری شما را هموار می‌کنند.
            </p>
          </div>
          <div className="relative">
            <img
              src="./images/pexels-photo-5212345.jpeg"
              alt="تیم یادینو"
              className="w-full h-80 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ارزش‌های ما</h2>
          <p className="text-xl text-gray-400">اصولی که کار ما را هدایت می‌کند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
              <value.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">تیم ما</h2>
          <p className="text-xl text-gray-400">با افرادی که یادینو را می‌سازند آشنا شوید</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="glass rounded-xl overflow-hidden card-hover">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-purple-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">آماده شروع یادگیری هستید؟</h2>
          <p className="text-xl text-gray-400 mb-8">
            امروز به جمع هزاران دانشجوی موفق ما بپیوندید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="glow-button px-8 py-4 rounded-lg font-semibold"
            >
              مشاهده دوره‌ها
            </a>
            <a
              href="/contact"
              className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              تماس با ما
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
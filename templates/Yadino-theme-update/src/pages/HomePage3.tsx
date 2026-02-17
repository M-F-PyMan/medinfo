import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Star, Users, BookOpen, Award, ArrowLeft, Zap, Target, 
  TrendingUp, Clock, CheckCircle, Globe, Sparkles, Rocket,
  Brain, Code, Palette, BarChart, Shield, Heart, Gift,
  Calendar, Eye, User, MessageCircle, Download, Share2,
  ChevronRight, Search, Filter, Bell, Mail, Phone
} from 'lucide-react';

function HomePage3() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    satisfaction: 0
  });

  const heroFeatures = [
    {
      icon: Brain,
      title: 'یادگیری هوشمند',
      description: 'سیستم یادگیری تطبیقی که با سرعت شما همراه می‌شود'
    },
    {
      icon: Rocket,
      title: 'پیشرفت سریع',
      description: 'روش‌های نوین آموزش برای یادگیری سریع‌تر'
    },
    {
      icon: Award,
      title: 'گواهی معتبر',
      description: 'مدارک بین‌المللی معتبر در صنعت'
    },
    {
      icon: Users,
      title: 'جامعه فعال',
      description: 'بیش از ۲۰ هزار دانشجوی فعال و متخصص'
    }
  ];

  const recentArticles = [
    {
      id: '1',
      title: 'انقلاب هوش مصنوعی در برنامه‌نویسی: آینده کدنویسی',
      excerpt: 'چگونه ابزارهای هوش مصنوعی مثل GitHub Copilot و ChatGPT در حال تغییر نحوه برنامه‌نویسی هستند',
      author: 'دکتر احمد رضایی',
      date: '۱۴۰۳/۰۸/۲۵',
      readTime: '۸ دقیقه',
      views: 2340,
      category: 'تکنولوژی',
      image: './images/pexels-photo-8386440.jpeg',
      tags: ['هوش مصنوعی', 'برنامه‌نویسی', 'آینده']
    },
    {
      id: '2',
      title: 'طراحی تجربه کاربری در عصر دیجیتال: اصول و تکنیک‌ها',
      excerpt: 'بررسی جدیدترین ترندهای UX Design و نحوه پیاده‌سازی آنها در پروژه‌های واقعی',
      author: 'مریم احمدی',
      date: '۱۴۰۳/۰۸/۲۳',
      readTime: '۶ دقیقه',
      views: 1890,
      category: 'طراحی',
      image: './images/pexels-photo-196644.jpeg',
      tags: ['UX', 'طراحی', 'تجربه کاربری']
    },
    {
      id: '3',
      title: 'استراتژی‌های نوین دیجیتال مارکتینگ برای سال ۱۴۰۳',
      excerpt: 'تحلیل کامل ترندهای بازاریابی دیجیتال و روش‌های موثر برای افزایش فروش آنلاین',
      author: 'محمد حسنی',
      date: '۱۴۰۳/۰۸/۲۰',
      readTime: '۱۰ دقیقه',
      views: 3120,
      category: 'مارکتینگ',
      image: './images/pexels-photo-265087.jpeg',
      tags: ['مارکتینگ', 'استراتژی', 'فروش']
    },
    {
      id: '4',
      title: 'مسیر شغلی در علم داده: از مبتدی تا متخصص',
      excerpt: 'راهنمای کامل برای ورود به حوزه علم داده و یادگیری مهارت‌های مورد نیاز',
      author: 'سارا میرزایی',
      date: '۱۴۰۳/۰۸/۱۸',
      readTime: '۱۲ دقیقه',
      views: 2780,
      category: 'مسیر شغلی',
      image: './images/pexels-photo-1181244.jpeg',
      tags: ['علم داده', 'مسیر شغلی', 'Python']
    },
    {
      id: '5',
      title: 'بلاک چین و Web3: فرصت‌ها و چالش‌های پیش رو',
      excerpt: 'نگاهی به آینده اینترنت غیرمتمرکز و فرصت‌های شغلی در این حوزه',
      author: 'علی پورمحمد',
      date: '۱۴۰۳/۰۸/۱۵',
      readTime: '۹ دقیقه',
      views: 1650,
      category: 'بلاک چین',
      image: './images/pexels-photo-8386440.jpeg',
      tags: ['بلاک چین', 'Web3', 'کریپتو']
    },
    {
      id: '6',
      title: 'موبایل فرست: طراحی اپلیکیشن‌های موبایل موثر',
      excerpt: 'اصول طراحی اپلیکیشن‌های موبایل که کاربران عاشقش می‌شوند',
      author: 'نازنین کرمی',
      date: '۱۴۰۳/۰۸/۱۲',
      readTime: '۷ دقیقه',
      views: 2100,
      category: 'موبایل',
      image: './images/pexels-photo-196644.jpeg',
      tags: ['موبایل', 'اپلیکیشن', 'طراحی']
    }
  ];

  const testimonials = [
    {
      name: 'رضا احمدی',
      role: 'توسعه‌دهنده Full Stack',
      company: 'دیجی‌کالا',
      image: './images/pexels-photo-1043471.jpeg',
              comment: 'یادینو زندگی شغلی‌م رو کاملا تغییر داد. از یه کارمند عادی به یه توسعه‌دهنده حرفه‌ای تبدیل شدم.',
      rating: 5,
      course: 'دوره کامل React'
    },
    {
      name: 'فاطمه میرزایی',
      role: 'طراح UI/UX',
      company: 'اسنپ',
      image: './images/pexels-photo-1239291.jpeg',
      comment: 'کیفیت آموزش‌ها و پشتیبانی مدرسان فوق‌العاده است. حالا در یکی از بهترین شرکت‌های کشور کار می‌کنم.',
      rating: 5,
      course: 'دوره طراحی UI/UX'
    },
    {
      name: 'محمد کریمی',
      role: 'متخصص دیجیتال مارکتینگ',
      company: 'بامیلو',
      image: './images/pexels-photo-1222271.jpeg',
      comment: 'بعد از گذراندن دوره مارکتینگ، درآمدم ۴ برابر شد و الان مدیر بازاریابی یه شرکت بزرگ هستم.',
      rating: 5,
      course: 'دوره دیجیتال مارکتینگ'
    }
  ];

  const newsUpdates = [
    {
      title: 'راه‌اندازی آزمایشگاه هوش مصنوعی',
      description: 'آزمایشگاه تخصصی AI با امکانات پیشرفته برای دانشجویان',
      date: '۱۴۰۳/۰۸/۲۵',
      type: 'اخبار'
    },
    {
      title: 'همکاری با دانشگاه‌های معتبر',
      description: 'قرارداد همکاری با ۱۰ دانشگاه برتر کشور امضا شد',
      date: '۱۴۰۳/۰۸/۲۰',
      type: 'همکاری'
    },
    {
      title: 'جشنواره استارتاپ‌های دانشجویی',
      description: 'برگزاری مسابقه ایده‌های نوآورانه با جوایز نقدی',
      date: '۱۴۰۳/۰۸/۱۸',
      type: 'رویداد'
    }
  ];

  const featuredCourses = [
    {
      id: '1',
      title: 'مسترکلاس React و Next.js',
      instructor: 'احمد رضایی',
      rating: 4.9,
      students: 2500,
      price: 299000,
      originalPrice: 499000,
      image: './images/pexels-photo-11035380.jpeg',
      badge: 'پرفروش',
      level: 'پیشرفته',
      duration: '۴۵ ساعت',
      lessons: 120
    },
    {
      id: '2',
      title: 'طراحی UI/UX از مبتدی تا حرفه‌ای',
      instructor: 'مریم احمدی',
      rating: 4.8,
      students: 1800,
      price: 249000,
      originalPrice: 399000,
      image: './images/pexels-photo-196644.jpeg',
      badge: 'جدید',
      level: 'همه سطوح',
      duration: '۳۸ ساعت',
      lessons: 95
    },
    {
      id: '3',
      title: 'دیجیتال مارکتینگ و SEO',
      instructor: 'محمد حسنی',
      rating: 4.7,
      students: 3200,
      price: 199000,
      originalPrice: 349000,
      image: './images/pexels-photo-265087.jpeg',
      badge: 'محبوب',
      level: 'متوسط',
      duration: '۳۲ ساعت',
      lessons: 80
    },
    {
      id: '4',
      title: 'Python و علم داده',
      instructor: 'سارا میرزایی',
      rating: 4.6,
      students: 1900,
      price: 279000,
      originalPrice: 399000,
      image: './images/pexels-photo-1181244.jpeg',
      badge: 'ترند',
      level: 'متوسط',
      duration: '۵۰ ساعت',
      lessons: 140
    }
  ];

  const categories = [
    { name: 'برنامه‌نویسی', icon: Code, count: 180, color: 'from-blue-500 to-cyan-500', description: 'از مبتدی تا حرفه‌ای' },
    { name: 'طراحی', icon: Palette, count: 95, color: 'from-pink-500 to-rose-500', description: 'UI/UX و گرافیک' },
    { name: 'مارکتینگ', icon: BarChart, count: 75, color: 'from-green-500 to-emerald-500', description: 'دیجیتال و سنتی' },
    { name: 'کسب‌وکار', icon: Target, count: 55, color: 'from-purple-500 to-violet-500', description: 'مدیریت و استراتژی' },
    { name: 'هوش مصنوعی', icon: Brain, count: 45, color: 'from-orange-500 to-amber-500', description: 'ML و Deep Learning' },
    { name: 'امنیت سایبری', icon: Shield, count: 35, color: 'from-red-500 to-pink-500', description: 'حفاظت و امنیت' }
  ];

  const stats = [
    { icon: Users, value: 25000, label: 'دانشجو فعال', suffix: '+' },
    { icon: BookOpen, value: 1200, label: 'دوره آموزشی', suffix: '+' },
    { icon: Award, value: 200, label: 'مدرس خبره', suffix: '+' },
    { icon: Star, value: 99, label: 'رضایت', suffix: '%' }
  ];

  const instructors = [
    {
      id: '1',
      name: 'دکتر احمد رضایی',
      title: 'متخصص React و JavaScript',
      experience: '۱۰ سال تجربه',
      students: 4500,
      courses: 15,
      rating: 4.9,
      image: './images/pexels-photo-1043471.jpeg',
      specialties: ['React', 'JavaScript', 'TypeScript']
    },
    {
      id: '2',
      name: 'مریم احمدی',
      title: 'طراح UI/UX ارشد',
      experience: '۷ سال تجربه',
      students: 3200,
      courses: 10,
      rating: 4.8,
      image: './images/pexels-photo-1239291.jpeg',
      specialties: ['Figma', 'Adobe XD', 'Prototyping']
    },
    {
      id: '3',
      name: 'محمد حسنی',
      title: 'متخصص دیجیتال مارکتینگ',
      experience: '۱۲ سال تجربه',
      students: 5100,
      courses: 18,
      rating: 4.7,
      image: './images/pexels-photo-1222271.jpeg',
      specialties: ['SEO', 'Google Ads', 'Analytics']
    },
    {
      id: '4',
      name: 'سارا میرزایی',
      title: 'متخصص علم داده',
      experience: '۸ سال تجربه',
      students: 2800,
      courses: 8,
      rating: 4.6,
      image: './images/pexels-photo-1181519.jpeg',
      specialties: ['Python', 'Machine Learning', 'TensorFlow']
    }
  ];

  const upcomingEvents = [
    {
      title: 'وبینار: آینده برنامه‌نویسی با AI',
      date: '۱۴۰۳/۰۹/۰۵',
      time: '۱۹:۰۰',
      speaker: 'دکتر احمد رضایی',
      attendees: 1200,
      type: 'وبینار'
    },
    {
      title: 'کارگاه عملی: طراحی سیستم‌های مقیاس‌پذیر',
      date: '۱۴۰۳/۰۹/۱۰',
      time: '۱۰:۰۰',
      speaker: 'علی پورمحمد',
      attendees: 500,
      type: 'کارگاه'
    },
    {
      title: 'چالش کدنویسی: ساخت اپلیکیشن در ۲۴ ساعت',
      date: '۱۴۰۳/۰۹/۱۵',
      time: '۰۹:۰۰',
              speaker: 'تیم یادینو',
      attendees: 800,
      type: 'چالش'
    }
  ];

  const partnerships = [
    { name: 'دیجی‌کالا', logo: '🛒' },
    { name: 'اسنپ', logo: '🚗' },
    { name: 'بامیلو', logo: '🛍️' },
    { name: 'تپسی', logo: '🚕' },
    { name: 'دیوار', logo: '🏠' },
    { name: 'کافه‌بازار', logo: '📱' }
  ];

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    const interval2 = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsUpdates.length);
    }, 3000);

    const interval3 = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partnerships.length);
    }, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let currentValue = 0;
        const increment = stat.value / steps;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= stat.value) {
            currentValue = stat.value;
            clearInterval(timer);
          }
          
          setAnimatedStats(prev => ({
            ...prev,
            [index === 0 ? 'students' : index === 1 ? 'courses' : index === 2 ? 'instructors' : 'satisfaction']: Math.floor(currentValue)
          }));
        }, stepDuration);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateNumbers();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rtl overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 md:pb-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/80 to-pink-900/80"></div>
        <div className="absolute inset-0">
          <img
            src="./images/pexels-photo-5212345.jpeg"
            alt="آموزش آنلاین"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="hidden md:inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full animate-pulse">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium">بیش از ۱۰۰ دوره جدید اضافه شد</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="text-gradient">یادینو</span>
              <br />
              آینده‌ساز
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-4xl mx-auto">
              با بیش از ۱۲۰۰ دوره تخصصی، مهارت‌های آینده را همین امروز یاد بگیرید
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {heroFeatures.map((feature, index) => (
                <div key={index} className="glass rounded-xl p-4 md:p-6 text-center card-hover">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-purple-400 mx-auto mb-2 md:mb-3" />
                  <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Link
                to="/courses"
                className="group relative overflow-hidden bg-white text-slate-900 px-6 md:px-12 py-4 md:py-6 rounded-full font-bold text-base md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <Rocket className="h-5 w-5 md:h-6 md:w-6" />
                  <span>شروع یادگیری رایگان</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group flex items-center space-x-2 md:space-x-3 space-x-reverse text-white hover:text-yellow-300 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Play className="h-8 w-8 md:h-10 md:w-10 mr-1" />
                </div>
                <span className="text-base md:text-xl font-medium">تور مجازی یادینو</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <section id="stats-section" className="relative -mt-16 md:-mt-32 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-4 md:p-8 text-center card-hover">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                  {index === 0 ? animatedStats.students :
                   index === 1 ? animatedStats.courses :
                   index === 2 ? animatedStats.instructors :
                   animatedStats.satisfaction}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-red-500 px-3 py-1 rounded-full text-white text-sm font-bold animate-pulse">
              جدید
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-lg font-medium">
                  {newsUpdates[currentNews].title} - {newsUpdates[currentNews].description}
                </span>
              </div>
            </div>
            <Bell className="h-5 w-5 text-purple-400" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            دسته‌بندی‌های <span className="text-gradient">تخصصی</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            از بین بیش از ۱۲۰۰ دوره در دسته‌بندی‌های مختلف، مسیر یادگیری خود را انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group relative overflow-hidden glass rounded-2xl p-4 md:p-8 card-hover">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 md:mb-6`}>
                  <category.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-2 text-sm md:text-base">{category.description}</p>
                <p className="text-purple-400 font-semibold mb-3 md:mb-4 text-sm md:text-base">{category.count} دوره موجود</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-2 space-x-reverse text-purple-400 hover:text-purple-300 font-medium group-hover:translate-x-2 transition-transform text-sm md:text-base"
                >
                  <span>مشاهده دوره‌ها</span>
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            دوره‌های <span className="text-gradient">پیشنهادی</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">محبوب‌ترین و جدیدترین دوره‌های آموزشی</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <div key={course.id} className="glass rounded-2xl overflow-hidden card-hover">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.badge === 'پرفروش' ? 'bg-green-500' :
                    course.badge === 'جدید' ? 'bg-blue-500' :
                    course.badge === 'محبوب' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}>
                    {course.badge}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                  {course.level}
                </div>
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="flex items-center space-x-1 space-x-reverse mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">{course.lessons} درس</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-purple-400 mb-2 md:mb-3 text-xs md:text-sm">مدرس: {course.instructor}</p>
                
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-xs md:text-sm">{course.rating}</span>
                    <span className="text-gray-400 text-xs">({course.students.toLocaleString('fa')})</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-3 w-3" />
                    <span className="text-xs">{course.students.toLocaleString('fa')} نفر</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div>
                    <span className="text-base md:text-lg font-bold text-purple-400">
                      {course.price.toLocaleString('fa')} تومان
                    </span>
                    <span className="text-gray-500 line-through text-xs md:text-sm mr-2">
                      {course.originalPrice.toLocaleString('fa')}
                    </span>
                  </div>
                  <div className="bg-red-500 px-2 py-1 rounded text-white text-xs font-medium">
                    {Math.round((course.originalPrice - course.price) / course.originalPrice * 100)}% تخفیف
                  </div>
                </div>

                <Link
                  to={`/course/${course.id}`}
                  className="w-full glow-button py-2 md:py-3 rounded-xl font-bold text-center block text-xs md:text-sm"
                >
                  مشاهده دوره
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            مقالات <span className="text-gradient">اخیر</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">آخرین مطالب و نکات آموزشی از متخصصان</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {recentArticles.map((article, index) => (
            <article key={article.id} className="glass rounded-xl overflow-hidden card-hover">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {article.readTime}
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse mb-2 md:mb-3 text-xs md:text-sm text-gray-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
                
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 line-clamp-2">
                  <Link to={`/blog/${article.id}`} className="hover:text-purple-400 transition-colors">
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse text-xs text-gray-400">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Eye className="h-3 w-3" />
                      <span>{article.views.toLocaleString('fa')}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-purple-400 hover:text-purple-300 text-xs md:text-sm font-medium flex items-center space-x-1 space-x-reverse"
                  >
                    <span>ادامه مطلب</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1 mt-2 md:mt-3">
                  {article.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 space-x-reverse glass px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </section>

      {/* Instructors Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            مدرسان <span className="text-gradient">برتر</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">از بهترین متخصصان صنعت یاد بگیرید</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="glass rounded-xl overflow-hidden card-hover">
              <div className="relative">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                  {instructor.experience}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {instructor.courses} دوره
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-2">{instructor.name}</h3>
                <p className="text-purple-400 mb-2 md:mb-3 text-xs md:text-sm">{instructor.title}</p>
                
                <div className="flex items-center justify-between mb-3 md:mb-4 text-xs md:text-sm">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{instructor.students.toLocaleString('fa')} نفر</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                  {instructor.specialties.slice(0, 2).map((specialty, index) => (
                    <span key={index} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/instructor/${instructor.id}`}
                  className="w-full glow-button py-2 rounded-lg text-xs md:text-sm font-medium text-center block"
                >
                  مشاهده پروفایل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            داستان‌های <span className="text-gradient">موفقیت</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">تجربه واقعی کسانی که با ما زندگی‌شان تغییر کرد</p>
        </div>

        <div className="relative">
          <div className="glass rounded-2xl p-8 text-center min-h-[300px] flex items-center justify-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-1 space-x-reverse mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-2xl text-gray-300 leading-relaxed mb-6 md:mb-8 italic">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-right">
                  <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-purple-400">{testimonials[currentTestimonial].role}</div>
                  <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-purple-500 scale-125' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            رویدادهای <span className="text-gradient">آینده</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">در وبینارها و کارگاه‌های آموزشی شرکت کنید</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="glass rounded-xl p-4 md:p-6 card-hover">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                  event.type === 'وبینار' ? 'bg-blue-500/20 text-blue-400' :
                  event.type === 'کارگاه' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {event.type}
                </span>
                <div className="text-gray-400 text-xs md:text-sm">{event.date}</div>
              </div>
              
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">{event.title}</h3>
              
              <div className="space-y-2 text-xs md:text-sm text-gray-400 mb-3 md:mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{event.speaker}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{event.attendees} شرکت‌کننده</span>
                </div>
              </div>
              
              <button className="w-full glow-button py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium">
                ثبت‌نام رایگان
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Partnerships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            شرکای <span className="text-gradient">ما</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">همکاری با بهترین شرکت‌های کشور</p>
        </div>

                <div className="glass rounded-xl p-4 md:p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center">
              <div className="text-center opacity-100 transition-all duration-500">
                <div className="text-3xl md:text-5xl mb-3 md:mb-4">{partnerships[currentPartner].logo}</div>
                <div className="text-sm md:text-lg text-gray-300 font-medium">{partnerships[currentPartner].name}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">شریک تجاری ما</div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 md:mt-6 space-x-2 space-x-reverse">
              {partnerships.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPartner(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
                    index === currentPartner ? 'bg-purple-500 scale-125' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="glass rounded-2xl p-6 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Mail className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">عضو خبرنامه شوید</h2>
            <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8">
              از آخرین اخبار، تخفیف‌های ویژه و محتوای آموزشی رایگان باخبر شوید
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 py-3 md:py-4 px-4 md:px-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              <button className="glow-button px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base">
                عضویت
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 space-x-reverse mt-6 md:mt-8 text-xs md:text-sm text-gray-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span>بدون اسپم</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span>لغو آسان</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span>محتوای ارزشمند</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          <div className="glass rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">با ما در تماس باشید</h2>
            <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
              سوالی دارید؟ تیم پشتیبانی ما ۲۴ ساعته آماده پاسخگویی است
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">تلفن پشتیبانی</div>
                  <div className="text-gray-400 text-sm md:text-base">۰۲۱-۱۲۳۴۵۶۷۸</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">ایمیل</div>
                  <div className="text-gray-400 text-sm md:text-base">info@yadino.ir</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">چت آنلاین</div>
                  <div className="text-gray-400 text-sm md:text-base">پاسخگویی فوری</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">پیام سریع</h3>
            <form className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="text"
                  placeholder="نام شما"
                  className="py-2 md:py-3 px-3 md:px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="py-2 md:py-3 px-3 md:px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                />
              </div>
              <textarea
                rows={4}
                placeholder="پیام شما..."
                className="w-full py-2 md:py-3 px-3 md:px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm md:text-base"
              ></textarea>
              <button className="w-full glow-button py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base">
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="relative overflow-hidden glass rounded-3xl p-6 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-pink-500 px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-medium mb-6 md:mb-8 text-sm md:text-base">
              <Gift className="h-4 w-4 md:h-5 md:w-5" />
              <span>پیشنهاد ویژه امروز</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              آماده تغییر زندگی‌تان هستید؟
            </h2>
            
            <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-10 max-w-3xl mx-auto">
              با بیش از ۲۵ هزار دانشجو که زندگی شغلی خود را تغییر داده‌اند، همراه شوید
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link
                to="/courses"
                className="group relative overflow-hidden glow-button px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-base md:text-xl flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <Zap className="h-5 w-5 md:h-6 md:w-6" />
                  <span>شروع رایگان</span>
                </span>
              </Link>
              
              <Link
                to="/about"
                className="glass px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-base md:text-xl hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Heart className="h-5 w-5 md:h-6 md:w-6" />
                <span>درباره ما</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage3;
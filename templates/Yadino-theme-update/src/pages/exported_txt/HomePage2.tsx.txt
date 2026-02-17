import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Star, Users, BookOpen, Award, ArrowLeft, Zap, Target, 
  TrendingUp, Clock, CheckCircle, Globe, Sparkles, Rocket,
  Brain, Code, Palette, BarChart, Shield, Heart, Gift
} from 'lucide-react';

function HomePage2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    satisfaction: 0
  });

  const heroSlides = [
    {
      title: 'آینده‌ای روشن با یادگیری',
      subtitle: 'مهارت‌های جدید، فرصت‌های بی‌نهایت',
      description: 'با بیش از ۱۰۰۰ دوره تخصصی، مسیر شغلی خود را تغییر دهید',
      image: './images/pexels-photo-5212345.jpeg',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      title: 'یادگیری بدون محدودیت',
      subtitle: 'هر زمان، هر مکان، هر دستگاه',
      description: 'دسترسی مادام‌العمر به محتوای با کیفیت و به‌روز',
      image: './images/pexels-photo-3184292.jpeg',
      gradient: 'from-pink-600 to-purple-600'
    },
    {
      title: 'از صفر تا حرفه‌ای',
      subtitle: 'با بهترین مدرسان کشور',
      description: 'پروژه‌های عملی، گواهی معتبر، پشتیبانی ۲۴ ساعته',
      image: './images/pexels-photo-1181244.jpeg',
      gradient: 'from-blue-600 to-cyan-600'
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
      duration: '۴۵ ساعت'
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
      duration: '۳۸ ساعت'
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
      duration: '۳۲ ساعت'
    }
  ];

  const categories = [
    { name: 'برنامه‌نویسی', icon: Code, count: 150, color: 'from-blue-500 to-cyan-500' },
    { name: 'طراحی', icon: Palette, count: 85, color: 'from-pink-500 to-rose-500' },
    { name: 'مارکتینگ', icon: BarChart, count: 65, color: 'from-green-500 to-emerald-500' },
    { name: 'کسب‌وکار', icon: Target, count: 45, color: 'from-purple-500 to-violet-500' },
    { name: 'هوش مصنوعی', icon: Brain, count: 35, color: 'from-orange-500 to-amber-500' },
    { name: 'امنیت سایبری', icon: Shield, count: 25, color: 'from-red-500 to-pink-500' }
  ];

  const testimonials = [
    {
      name: 'سارا میرزایی',
      role: 'توسعه‌دهنده Frontend',
      company: 'دیجی‌کالا',
      image: './images/pexels-photo-1239291.jpeg',
      comment: 'بعد از گذراندن دوره React، تونستم شغل رویایی‌م رو پیدا کنم. کیفیت آموزش فوق‌العاده بود.',
      rating: 5
    },
    {
      name: 'علی پورمحمد',
      role: 'طراح UI/UX',
      company: 'اسنپ',
      image: './images/pexels-photo-1043471.jpeg',
      comment: 'مدرسان حرفه‌ای و محتوای کاربردی. واقعا ارزش پول خودش رو داره.',
      rating: 5
    },
    {
      name: 'فاطمه احمدی',
      role: 'متخصص دیجیتال مارکتینگ',
      company: 'بامیلو',
      image: './images/pexels-photo-1181519.jpeg',
      comment: 'دوره‌های مارکتینگ کمک زیادی به پیشرفت شغلی‌م کرد. پیشنهاد می‌کنم.',
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: 15000, label: 'دانشجو فعال', suffix: '+' },
    { icon: BookOpen, value: 800, label: 'دوره آموزشی', suffix: '+' },
    { icon: Award, value: 150, label: 'مدرس خبره', suffix: '+' },
    { icon: Star, value: 98, label: 'رضایت', suffix: '%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
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
          
          setAnimatedNumbers(prev => ({
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
      {/* Hero Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pb-20 sm:pb-16 lg:pb-0">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90`}></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium">جدیدترین دوره‌ها اضافه شد</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 font-light">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/courses"
                className="group relative overflow-hidden bg-white text-slate-900 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center space-x-2 space-x-reverse">
                  <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>شروع یادگیری</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group flex items-center space-x-2 sm:space-x-3 space-x-reverse text-white hover:text-yellow-300 transition-colors">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 mr-1" />
                </div>
                <span className="text-base sm:text-lg font-medium">مشاهده ویدیو معرفی</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 space-x-reverse">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Floating Stats */}
      <section id="stats-section" className="relative -mt-10 sm:-mt-16 lg:-mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-4 sm:p-6 lg:p-8 text-center card-hover">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {index === 0 ? animatedNumbers.students :
                   index === 1 ? animatedNumbers.courses :
                   index === 2 ? animatedNumbers.instructors :
                   animatedNumbers.satisfaction}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            دسته‌بندی‌های <span className="text-gradient">محبوب</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            از بین صدها دوره در دسته‌بندی‌های مختلف، مسیر یادگیری خود را انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group relative overflow-hidden glass rounded-2xl p-8 card-hover">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                <p className="text-gray-400 mb-4">{category.count} دوره موجود</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-2 space-x-reverse text-purple-400 hover:text-purple-300 font-medium group-hover:translate-x-2 transition-transform"
                >
                  <span>مشاهده دوره‌ها</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            دوره‌های <span className="text-gradient">ویژه</span>
          </h2>
          <p className="text-xl text-gray-400">محبوب‌ترین و جدیدترین دوره‌های آموزشی</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div key={course.id} className={`glass rounded-2xl overflow-hidden card-hover ${index === 1 ? 'lg:scale-105' : ''}`}>
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.badge === 'پرفروش' ? 'bg-green-500' :
                    course.badge === 'جدید' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {course.badge}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                  {course.level}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="flex items-center space-x-1 space-x-reverse mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{course.title}</h3>
                <p className="text-purple-400 mb-4">مدرس: {course.instructor}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-400 text-sm">({course.students.toLocaleString('fa')})</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{course.students.toLocaleString('fa')} نفر</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-purple-400">
                      {course.price.toLocaleString('fa')} تومان
                    </span>
                    <span className="text-gray-500 line-through text-base sm:text-lg mr-2">
                      {course.originalPrice.toLocaleString('fa')}
                    </span>
                  </div>
                  <div className="bg-red-500 px-3 py-1 rounded text-white text-sm font-medium">
                    {Math.round((course.originalPrice - course.price) / course.originalPrice * 100)}% تخفیف
                  </div>
                </div>

                <Link
                  to={`/course/${course.id}`}
                  className="w-full glow-button py-4 rounded-xl font-bold text-center block"
                >
                  مشاهده دوره
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            نظرات <span className="text-gradient">دانشجویان</span>
          </h2>
          <p className="text-xl text-gray-400">تجربه واقعی کسانی که با ما یاد گرفتند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass rounded-2xl p-8 card-hover">
              <div className="flex items-center space-x-1 space-x-reverse mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-purple-400 text-sm">{testimonial.role}</div>
                  <div className="text-gray-400 text-sm">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="relative overflow-hidden glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-medium mb-6 sm:mb-8 text-sm sm:text-base">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>پیشنهاد ویژه</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              آماده تغییر زندگی‌تان هستید؟
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-10 max-w-3xl mx-auto px-4 sm:px-0">
              با بیش از ۱۵ هزار دانشجو که زندگی شغلی خود را تغییر داده‌اند، همراه شوید
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                to="/courses"
                className="group relative overflow-hidden glow-button px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg text-center"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>شروع رایگان</span>
                </span>
              </Link>
              
              <Link
                to="/about"
                className="glass px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>درباره ما</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage2;
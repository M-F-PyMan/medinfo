import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Users, BookOpen, Award, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      id: 1,
      title: 'یادگیری تعاملی',
      subtitle: 'تجربه آموزشی متفاوت',
      description: 'با استفاده از تکنولوژی‌های نوین، یادگیری را به تجربه‌ای لذت‌بخش تبدیل کرده‌ایم',
      image: './images/pexels-photo-5212345.jpeg',
      gradient: 'from-purple-600/80 to-blue-600/80',
      stats: { students: '۱۵,۰۰۰+', courses: '۸۰۰+', rating: '۴.۹' }
    },
    {
      id: 2,
      title: 'اساتید برتر',
      subtitle: 'از بهترین متخصصان',
      description: 'یادگیری از اساتید با تجربه و متخصص در زمینه‌های مختلف تکنولوژی و کسب‌وکار',
      image: './images/pexels-photo-1043471.jpeg',
      gradient: 'from-pink-600/80 to-purple-600/80',
      stats: { students: '۱۲,۰۰۰+', courses: '۶۵۰+', rating: '۴.۸' }
    },
    {
      id: 3,
      title: 'دسترسی همه‌جا',
      subtitle: 'یادگیری بدون محدودیت',
      description: 'در هر زمان و مکان، با هر دستگاهی به محتوای آموزشی با کیفیت دسترسی داشته باشید',
      image: './images/pexels-photo-3184292.jpeg',
      gradient: 'from-blue-600/80 to-cyan-600/80',
      stats: { students: '۱۸,۰۰۰+', courses: '۹۵۰+', rating: '۴.۷' }
    },
    {
      id: 4,
      title: 'پروژه‌های عملی',
      subtitle: 'یادگیری کاربردی',
      description: 'با انجام پروژه‌های واقعی، مهارت‌های خود را در دنیای واقعی به کار بگیرید',
      image: './images/pexels-photo-1181244.jpeg',
      gradient: 'from-green-600/80 to-blue-600/80',
      stats: { students: '۲۰,۰۰۰+', courses: '۱,۲۰۰+', rating: '۴.۹' }
    }
  ];

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const featuredCourses = [
    {
      id: '1',
      title: 'برنامه‌نویسی React و JavaScript',
      instructor: 'احمد رضایی',
      rating: 4.9,
      students: 1250,
      price: 199000,
      image: './images/pexels-photo-11035380.jpeg'
    },
    {
      id: '2',
      title: 'طراحی UI/UX حرفه‌ای',
      instructor: 'مریم احمدی',
      rating: 4.8,
      students: 890,
      price: 299000,
      image: './images/pexels-photo-196644.jpeg'
    },
    {
      id: '3',
      title: 'دیجیتال مارکتینگ پیشرفته',
      instructor: 'محمد حسنی',
      rating: 4.7,
      students: 2100,
      price: 149000,
      image: './images/pexels-photo-265087.jpeg'
    }
  ];

  const stats = [
    { icon: Users, value: '۱۰,۰۰۰+', label: 'دانشجو فعال' },
    { icon: BookOpen, value: '۵۰۰+', label: 'دوره آموزشی' },
    { icon: Award, value: '۱۰۰+', label: 'مدرس خبره' },
    { icon: Star, value: '۴.۸', label: 'امتیاز رضایت' }
  ];

  return (
    <div className="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  آینده‌ت رو با{' '}
                  <span className="text-gradient">یادگیری آنلاین</span>{' '}
                  بساز
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  بیش از ۵۰۰ دوره تخصصی در زمینه‌های مختلف تکنولوژی، کسب‌وکار و هنر.
                  از بهترین اساتید کشور یاد بگیر و مهارت‌هایت رو به سطح بعدی برسون.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="glow-button px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <span>شروع یادگیری</span>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <button className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse">
                  <Play className="h-5 w-5" />
                  <span>مشاهده ویدیو</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass rounded-2xl p-8 animate-float">
                <img
                  src="./images/pexels-photo-5212345.jpeg"
                  alt="آموزش آنلاین"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute -bottom-4 -right-4 glass-light rounded-lg p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm">۱,۲۳۴ نفر آنلاین</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ویژگی‌های منحصر به فرد</h2>
          <p className="text-xl text-gray-400">آنچه ما را از دیگران متمایز می‌کند</p>
        </div>
        
        <div 
          className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative h-full">
            {sliderData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 slide-transition ${
                  index === currentSlide ? 'slide-enter-active' : 'slide-enter'
                }`}
              >
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl mx-auto px-4 md:px-8">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <h3 className="text-2xl font-bold mb-3 animate-fade-in">
                        {slide.title}
                      </h3>
                      <p className="text-base mb-4 text-purple-200">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm mb-6 leading-relaxed px-2">
                        {slide.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 mt-8">
                        <div className="glass-light rounded-lg p-2">
                          <div className="text-lg font-bold text-purple-300">
                            {slide.stats.students}
                          </div>
                          <div className="text-xs text-purple-200">دانشجو</div>
                        </div>
                        <div className="glass-light rounded-lg p-2">
                          <div className="text-lg font-bold text-purple-300">
                            {slide.stats.courses}
                          </div>
                          <div className="text-xs text-purple-200">دوره</div>
                        </div>
                        <div className="glass-light rounded-lg p-2">
                          <div className="text-lg font-bold text-purple-300">
                            {slide.stats.rating}
                          </div>
                          <div className="text-xs text-purple-200">امتیاز</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <h3 className="text-4xl lg:text-6xl font-bold mb-4 animate-fade-in">
                        {slide.title}
                      </h3>
                      <p className="text-xl lg:text-2xl mb-6 text-purple-200">
                        {slide.subtitle}
                      </p>
                      <p className="text-lg lg:text-xl mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-6 lg:gap-8 mt-12">
                        <div className="glass-light rounded-lg p-4">
                          <div className="text-3xl lg:text-4xl font-bold text-purple-300">
                            {slide.stats.students}
                          </div>
                          <div className="text-sm text-purple-200">دانشجو فعال</div>
                        </div>
                        <div className="glass-light rounded-lg p-4">
                          <div className="text-3xl lg:text-4xl font-bold text-purple-300">
                            {slide.stats.courses}
                          </div>
                          <div className="text-sm text-purple-200">دوره آموزشی</div>
                        </div>
                        <div className="glass-light rounded-lg p-4">
                          <div className="text-3xl lg:text-4xl font-bold text-purple-300">
                            {slide.stats.rating}
                          </div>
                          <div className="text-sm text-purple-200">امتیاز رضایت</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 md:p-3 rounded-full glass hover:bg-white/20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 md:p-3 rounded-full glass hover:bg-white/20 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 space-x-reverse">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-linear"
              style={{ 
                width: `${((currentSlide + 1) / sliderData.length) * 100}%`,
                animation: 'progress 4s linear infinite'
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">دوره‌های محبوب</h2>
          <p className="text-xl text-gray-400">از پرطرفدارترین دوره‌های آموزشی ما دیدن کنید</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div key={course.id} className="glass rounded-xl overflow-hidden card-hover">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">مدرس: {course.instructor}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{course.students.toLocaleString('fa')} نفر</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">
                    {course.price.toLocaleString('fa')} تومان
                  </span>
                  <Link
                    to={`/course/${course.id}`}
                    className="glow-button px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    مشاهده دوره
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 space-x-reverse glass px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <span>مشاهده همه دوره‌ها</span>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">مدرسان برتر</h2>
          <p className="text-xl text-gray-400">از بهترین متخصصان صنعت یاد بگیرید</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              id: '1',
              name: 'احمد رضایی',
              title: 'متخصص React و JavaScript',
              experience: '۸ سال تجربه',
              students: 3500,
              courses: 12,
              rating: 4.9,
              image: './images/pexels-photo-1043471.jpeg',
              bio: 'توسعه‌دهنده Frontend ارشد با تجربه کار در شرکت‌های بزرگ تکنولوژی'
            },
            {
              id: '2',
              name: 'مریم احمدی',
              title: 'طراح UI/UX',
              experience: '۶ سال تجربه',
              students: 2800,
              courses: 8,
              rating: 4.8,
              image: './images/pexels-photo-1239291.jpeg',
              bio: 'طراح خلاق با تجربه طراحی برای استارتاپ‌ها و شرکت‌های بزرگ'
            },
            {
              id: '3',
              name: 'محمد حسنی',
              title: 'متخصص دیجیتال مارکتینگ',
              experience: '۱۰ سال تجربه',
              students: 4200,
              courses: 15,
              rating: 4.7,
              image: './images/pexels-photo-1222271.jpeg',
              bio: 'مشاور بازاریابی دیجیتال با سابقه همکاری با برندهای معتبر'
            },
            {
              id: '4',
              name: 'سارا میرزایی',
              title: 'متخصص علم داده',
              experience: '۷ سال تجربه',
              students: 1900,
              courses: 6,
              rating: 4.6,
              image: './images/pexels-photo-1181519.jpeg',
              bio: 'دانشمند داده با تخصص در یادگیری ماشین و هوش مصنوعی'
            }
          ].map((instructor) => (
            <div key={instructor.id} className="glass rounded-xl overflow-hidden card-hover">
              <div className="relative">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                  {instructor.experience}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
                <p className="text-purple-400 mb-3">{instructor.title}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{instructor.bio}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{instructor.students.toLocaleString('fa')} نفر</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{instructor.courses} دوره</span>
                  </div>
                </div>

                <Link
                  to={`/instructor/${instructor.id}`}
                  className="w-full glow-button py-2 rounded-lg text-sm font-medium text-center block"
                >
                  مشاهده پروفایل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">چرا یادینو؟</h2>
          <p className="text-xl text-gray-400">ویژگی‌هایی که ما رو متفاوت می‌کنه</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'آموزش هدفمند',
              description: 'دوره‌های طراحی شده برای نیازهای واقعی بازار کار'
            },
            {
              icon: '🏆',
              title: 'اساتید برتر',
              description: 'یادگیری از بهترین متخصصان صنعت با سال‌ها تجربه'
            },
            {
              icon: '📱',
              title: 'دسترسی همه‌جا',
              description: 'آموزش در هر زمان و مکان با کیفیت بالا'
            },
            {
              icon: '🎓',
              title: 'گواهی معتبر',
              description: 'دریافت مدرک معتبر پس از اتمام موفقیت‌آمیز دوره'
            },
            {
              icon: '💬',
              title: 'پشتیبانی ۲۴/۷',
              description: 'پاسخگویی سریع به سوالات در تمام ساعات شبانه‌روز'
            },
            {
              icon: '🔄',
              title: 'به‌روزرسانی مداوم',
              description: 'محتوای دوره‌ها همیشه با آخرین تکنولوژی‌ها همراه'
            }
          ].map((feature, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, Play, Gift, Zap, CheckCircle, Timer, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

function SpecialSalePage1() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const specialCourses = [
    {
      id: '1',
      title: 'پکیج کامل برنامه‌نویسی Frontend',
      originalPrice: 899000,
      salePrice: 299000,
      discount: 67,
      instructor: 'احمد رضایی',
      rating: 4.9,
      students: 2500,
      duration: '۸۵ ساعت',
      courses: 5,
      image: './images/pexels-photo-11035380.jpeg',
      features: ['React', 'Vue.js', 'Angular', 'TypeScript', 'پروژه‌های عملی']
    },
    {
      id: '2',
      title: 'مجموعه طراحی UI/UX حرفه‌ای',
      originalPrice: 699000,
      salePrice: 249000,
      discount: 64,
      instructor: 'مریم احمدی',
      rating: 4.8,
      students: 1800,
      duration: '۶۰ ساعت',
      courses: 4,
      image: './images/pexels-photo-196644.jpeg',
      features: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Portfolio']
    },
    {
      id: '3',
      title: 'پکیج جامع دیجیتال مارکتینگ',
      originalPrice: 799000,
      salePrice: 279000,
      discount: 65,
      instructor: 'محمد حسنی',
      rating: 4.7,
      students: 3200,
      duration: '۷۵ ساعت',
      courses: 6,
      image: './images/pexels-photo-265087.jpeg',
      features: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Marketing']
    }
  ];

  const handleAddToCart = (course: any) => {
    addToCart({
      id: course.id,
      title: course.title,
      price: course.salePrice,
      image: course.image,
      instructor: course.instructor
    });
  };

  return (
    <div className="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-slate-900 to-pink-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-red-500 px-4 py-2 rounded-full text-white font-semibold mb-6 animate-pulse">
              <Gift className="h-5 w-5" />
              <span>فروش ویژه محدود</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">تا ۷۰٪ تخفیف</span>
              <br />
              روی بهترین دوره‌ها
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              فرصت طلایی برای یادگیری مهارت‌های جدید! پکیج‌های جامع آموزشی با بیشترین تخفیف سال
            </p>

            {/* Countdown Timer */}
            <div className="glass rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
                <Timer className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-semibold">زمان باقی‌مانده:</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">{timeLeft.days}</div>
                  <div className="text-xs text-gray-400">روز</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-400">ساعت</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-400">دقیقه</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-400">ثانیه</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#courses" className="glow-button px-8 py-4 rounded-lg font-semibold">
                مشاهده پیشنهادات ویژه
              </a>
              <button className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
                <Play className="h-5 w-5" />
                <span>مشاهده ویدیو معرفی</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">پیشنهادات ویژه</h2>
          <p className="text-xl text-gray-400">بهترین پکیج‌های آموزشی با بیشترین تخفیف</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specialCourses.map((course, index) => (
            <div key={course.id} className={`glass rounded-xl overflow-hidden card-hover relative ${index === 1 ? 'lg:scale-105 border-2 border-purple-500' : ''}`}>
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-white font-semibold text-sm">
                  محبوب‌ترین
                </div>
              )}
              
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full text-white font-bold text-sm">
                  {course.discount}% تخفیف
                </div>
                <div className="absolute top-4 left-4 bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {course.courses} دوره
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">مدرس: {course.instructor}</p>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString('fa')} نفر</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <span className="text-2xl font-bold text-purple-400">
                      {course.salePrice.toLocaleString('fa')} تومان
                    </span>
                    <span className="text-gray-500 line-through text-lg">
                      {course.originalPrice.toLocaleString('fa')}
                    </span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">
                    شما {(course.originalPrice - course.salePrice).toLocaleString('fa')} تومان صرفه‌جویی می‌کنید!
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">شامل:</div>
                  <div className="flex flex-wrap gap-1">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {course.features.length > 3 && (
                      <span className="text-gray-400 text-xs">+{course.features.length - 3} مورد دیگر</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(course)}
                  className="w-full glow-button py-3 rounded-lg font-semibold mb-3"
                >
                  افزودن به سبد خرید
                </button>
                
                <Link
                  to={`/course/${course.id}`}
                  className="w-full glass py-2 rounded-lg text-center block hover:bg-white/10 transition-colors text-sm"
                >
                  مشاهده جزئیات
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">چرا این فرصت را از دست ندهید؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">دسترسی فوری</h3>
              <p className="text-gray-400">بلافاصله پس از خرید به تمام محتوا دسترسی پیدا کنید</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ضمانت بازگشت وجه</h3>
              <p className="text-gray-400">تا ۳۰ روز ضمانت کامل بازگشت وجه</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">بونوس رایگان</h3>
              <p className="text-gray-400">منابع اضافی و پروژه‌های عملی به صورت رایگان</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">فرصت محدود!</h2>
          <p className="text-xl text-gray-400 mb-8">
            این تخفیف‌ها فقط تا پایان این هفته معتبر هستند
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="glow-button px-8 py-4 rounded-lg font-semibold"
            >
              مشاهده همه دوره‌ها
            </Link>
            <Link
              to="/contact"
              className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              مشاوره رایگان
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SpecialSalePage1;
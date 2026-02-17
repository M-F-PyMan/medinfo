import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, Play, Zap, Award, CheckCircle, ArrowRight, BookOpen, Target } from 'lucide-react';
import { useCart } from '../context/CartContext';

function SpecialSalePage2() {
  const [selectedBundle, setSelectedBundle] = useState('premium');
  const { addToCart } = useCart();

  const bundles = {
    basic: {
      id: 'basic',
      name: 'پکیج مقدماتی',
      originalPrice: 399000,
      salePrice: 149000,
      discount: 63,
      courses: 3,
      duration: '۳۵ ساعت',
      features: [
        'دسترسی به ۳ دوره اصلی',
        'پشتیبانی ۳ ماهه',
        'گواهی پایان دوره',
        'دسترسی مادام‌العمر',
        'دسترسی به دوره کامل',
        'پروژه‌های حضوری',
        'منتورشیپ 1 ماهه',
      ],
      popular: false
    },
    premium: {
      id: 'premium',
      name: 'پکیج حرفه‌ای',
      originalPrice: 799000,
      salePrice: 299000,
      discount: 63,
      courses: 7,
      duration: '۸۵ ساعت',
      features: [
        'دسترسی به ۷ دوره کامل',
        'پشتیبانی ۶ ماهه',
        'گواهی معتبر بین‌المللی',
        'پروژه‌های عملی',
        'منتورشیپ 12 ماهه',
        'دسترسی به کمیونیتی خصوصی'
      ],
      popular: true
    },
    ultimate: {
      id: 'ultimate',
      name: 'پکیج کامل',
      originalPrice: 1299000,
      salePrice: 499000,
      discount: 62,
      courses: 12,
      duration: '۱۵۰ ساعت',
      features: [
        'دسترسی به تمام دوره‌ها',
        'پشتیبانی ۱ ساله',
        'گواهی معتبر بین‌المللی',
        'پروژه‌های صنعتی',
        'منتورشیپ ۳ ماهه',
        'جلسات ۱:۱ با مدرس',
        'کمک در پیدا کردن شغل'
      ],
      popular: false
    }
  };

  const testimonials = [
    {
      name: 'علی محمدی',
      role: 'توسعه‌دهنده Frontend',
      image: './images/pexels-photo-1043471.jpeg',
      comment: 'بعد از گذراندن این دوره‌ها، حقوقم ۳ برابر شد و تو شرکت بزرگی استخدام شدم.'
    },
    {
      name: 'مریم احمدی',
      role: 'طراح UI/UX',
      image: './images/pexels-photo-1239291.jpeg',
      comment: 'کیفیت آموزش‌ها فوق‌العاده بود. حالا فریلنسر موفقی هستم و درآمد عالی دارم.'
    },
    {
      name: 'حسین کریمی',
      role: 'متخصص دیجیتال مارکتینگ',
      image: './images/pexels-photo-1222271.jpeg',
      comment: 'این دوره‌ها زندگی‌م رو تغییر داد. الان مدیر بازاریابی یه شرکت بزرگ هستم.'
    }
  ];

  const handleSelectBundle = (bundleId: string) => {
    const bundle = bundles[bundleId as keyof typeof bundles];
    addToCart({
      id: bundle.id,
      title: bundle.name,
      price: bundle.salePrice,
      image: './images/pexels-photo-11035380.jpeg',
              instructor: 'تیم یادینو'
    });
  };

  return (
    <div className="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900/50 to-pink-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-white font-semibold mb-6">
                <Zap className="h-5 w-5" />
                <span>پیشنهاد ویژه محدود</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                مسیر شغلی خود را
                <br />
                <span className="text-gradient">تغییر دهید</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                با پکیج‌های جامع آموزشی ما، مهارت‌های مورد نیاز بازار کار را یاد بگیرید
                و درآمد خود را چندین برابر کنید
              </p>

              <div className="flex items-center space-x-8 space-x-reverse mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">۱۰,۰۰۰+</div>
                  <div className="text-gray-400 text-sm">دانشجو موفق</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">۹۵٪</div>
                  <div className="text-gray-400 text-sm">رضایت</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">۴.۹</div>
                  <div className="text-gray-400 text-sm">امتیاز</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#bundles" className="glow-button px-8 py-4 rounded-lg font-semibold text-center">
                  مشاهده پکیج‌ها
                </a>
                <button className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
                  <Play className="h-5 w-5" />
                  <span>داستان موفقیت</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="glass rounded-2xl p-8 animate-float">
                <img
                  src="./images/pexels-photo-5212345.jpeg"
                  alt="آموزش آنلاین"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>آموزش از صفر تا صد</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>پروژه‌های عملی و کاربردی</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>پشتیبانی مادام‌العمر</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Selection */}
      <section id="bundles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">پکیج مناسب خود را انتخاب کنید</h2>
          <p className="text-xl text-gray-400">هر پکیج برای سطح مهارت خاصی طراحی شده است</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(bundles).map(([key, bundle]) => (
            <div
              key={key}
              className={`glass rounded-xl overflow-hidden card-hover relative ${
                bundle.popular ? 'lg:scale-105 border-2 border-purple-500' : ''
              }`}
            >
              {bundle.popular && (
                <div className="absolute mt-2 -top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-white font-semibold text-sm">
                  پیشنهاد ویژه
                </div>
              )}

              <div className="p-14">
                <div className="text-center mb-9">
                  <h3 className="text-2xl font-bold mb-5">{bundle.name}</h3>
                  <div className="flex items-center justify-center space-x-2 space-x-reverse mb-5">
                    <span className="text-3xl font-bold text-purple-400 ">
                      {bundle.salePrice.toLocaleString('fa')} تومان
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <span className="text-gray-500 line-through">
                      {bundle.originalPrice.toLocaleString('fa')} تومان
                    </span>
                    <span className="bg-red-500 px-2 py-1 rounded text-white text-sm">
                      {bundle.discount}% تخفیف
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <BookOpen className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm text-gray-400">{bundle.courses} دوره</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <Clock className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm text-gray-400">{bundle.duration}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {bundle.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3 space-x-reverse">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectBundle(key)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    bundle.popular
                      ? 'glow-button'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  انتخاب این پکیج
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">داستان‌های موفقیت</h2>
          <p className="text-xl text-gray-400">دانشجویان ما چه می‌گویند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass rounded-xl p-6 card-hover">
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-purple-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">"{testimonial.comment}"</p>
              <div className="flex items-center space-x-1 space-x-reverse mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <Award className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">ضمانت ۳۰ روزه بازگشت وجه</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                ما به کیفیت دوره‌هایمان اطمینان کامل داریم. اگر تا ۳۰ روز پس از خرید راضی نبودید،
                تمام پول شما را بدون هیچ سوالی بازگردانیم.
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>بدون شرط و قید</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🛡️</div>
              <div className="text-3xl font-bold text-green-400 mb-2">۱۰۰٪</div>
              <div className="text-gray-400">ضمانت رضایت</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">آماده تغییر زندگی‌تان هستید؟</h2>
          <p className="text-xl text-gray-400 mb-8">
            هزاران نفر قبل از شما این تصمیم را گرفتند و موفق شدند
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#bundles" className="glow-button px-8 py-4 rounded-lg font-semibold">
              شروع کنید
            </a>
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

export default SpecialSalePage2;
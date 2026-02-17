import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Briefcase, Send, CheckCircle, Star, Award } from 'lucide-react';

function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    coverLetter: ''
  });

  const jobOpenings = [
    {
      id: '1',
      title: 'مدرس React و JavaScript',
      department: 'آموزش',
      type: 'تمام وقت',
      location: 'تهران / دورکاری',
      salary: '۱۵-۲۵ میلیون تومان',
      experience: '۳+ سال',
      description: 'ما به دنبال یک مدرس با تجربه در React و JavaScript هستیم که بتواند دوره‌های با کیفیت تولید کند.',
      requirements: [
        'تسلط کامل به React، JavaScript و TypeScript',
        'تجربه حداقل ۳ سال در توسعه Frontend',
        'مهارت‌های آموزشی و ارتباطی قوی',
        'آشنایی با ابزارهای مدرن توسعه',
        'تجربه کار با تیم'
      ],
      benefits: [
        'حقوق رقابتی',
        'بیمه تکمیلی',
        'محیط کار دوستانه',
        'امکان دورکاری',
        'فرصت‌های رشد'
      ]
    },
    {
      id: '2',
      title: 'طراح UI/UX',
      department: 'طراحی',
      type: 'تمام وقت',
      location: 'تهران',
      salary: '۱۲-۲۰ میلیون تومان',
      experience: '۲+ سال',
      description: 'برای تیم طراحی خود به دنبال یک طراح خلاق و با تجربه هستیم.',
      requirements: [
        'تسلط به Figma، Adobe XD و Sketch',
        'درک عمیق از اصول UI/UX',
        'تجربه طراحی برای وب و موبایل',
        'مهارت‌های ارتباطی خوب',
        'آشنایی با HTML/CSS'
      ],
      benefits: [
        'حقوق رقابتی',
        'بیمه درمانی',
        'وعده غذای رایگان',
        'ساعت کار انعطاف‌پذیر',
        'آموزش‌های تخصصی'
      ]
    },
    {
      id: '3',
      title: 'توسعه‌دهنده Backend',
      department: 'فناوری',
      type: 'تمام وقت',
      location: 'تهران / دورکاری',
      salary: '۱۸-۳۰ میلیون تومان',
      experience: '۴+ سال',
      description: 'برای توسعه و نگهداری سیستم‌های Backend خود به یک توسعه‌دهنده ارشد نیاز داریم.',
      requirements: [
        'تسلط به Node.js، Python یا Go',
        'تجربه کار با پایگاه‌های داده',
        'آشنایی با معماری میکروسرویس',
        'تجربه کار با Docker و Kubernetes',
        'مهارت‌های حل مسئله قوی'
      ],
      benefits: [
        'حقوق بالا',
        'بیمه کامل',
        'بونوس عملکرد',
        'امکان دورکاری کامل',
        'تجهیزات کاری'
      ]
    },
    {
      id: '4',
      title: 'متخصص بازاریابی دیجیتال',
      department: 'بازاریابی',
      type: 'تمام وقت',
      location: 'تهران',
      salary: '۱۰-۱۸ میلیون تومان',
      experience: '۲+ سال',
      description: 'برای رشد و توسعه کانال‌های دیجیتال خود به یک متخصص بازاریابی نیاز داریم.',
      requirements: [
        'تجربه در SEO و SEM',
        'آشنایی با Google Analytics',
        'مهارت در تولید محتوا',
        'تجربه مدیریت شبکه‌های اجتماعی',
        'خلاقیت و نوآوری'
      ],
      benefits: [
        'حقوق مناسب',
        'بیمه درمانی',
        'محیط کار پویا',
        'فرصت‌های یادگیری',
        'پاداش‌های تشویقی'
      ]
    }
  ];

  const companyValues = [
    {
      icon: '🎯',
      title: 'تمرکز بر کیفیت',
      description: 'ما همیشه به دنبال ارائه بهترین کیفیت در تمام کارهایمان هستیم'
    },
    {
      icon: '🤝',
      title: 'کار تیمی',
      description: 'باور داریم که با همکاری می‌توانیم به اهداف بزرگ‌تری برسیم'
    },
    {
      icon: '🚀',
      title: 'نوآوری',
      description: 'همیشه به دنبال راه‌های جدید و بهتر برای انجام کارها هستیم'
    },
    {
      icon: '📚',
      title: 'یادگیری مداوم',
      description: 'یادگیری و رشد مداوم بخش جدایی‌ناپذیر فرهنگ ما است'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'حقوق رقابتی',
      description: 'حقوق و مزایای مناسب متناسب با تجربه و مهارت'
    },
    {
      icon: Clock,
      title: 'ساعت کار انعطاف‌پذیر',
      description: 'امکان تنظیم ساعت کار متناسب با نیازهای شخصی'
    },
    {
      icon: Users,
      title: 'تیم حرفه‌ای',
      description: 'همکاری با بهترین متخصصان صنعت'
    },
    {
      icon: Award,
      title: 'فرصت‌های رشد',
      description: 'مسیر رشد شغلی مشخص و آموزش‌های تخصصی'
    }
  ];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('درخواست شما با موفقیت ارسال شد!');
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      portfolio: '',
      coverLetter: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">فرصت‌های شغلی</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          به تیم ما بپیوندید و در ساخت آینده آموزش آنلاین نقش داشته باشید
        </p>
      </div>

      {/* Company Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">ارزش‌های ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyValues.map((value, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">مزایای کار با ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">موقعیت‌های شغلی باز</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobOpenings.map((job) => (
            <div key={job.id} className="glass rounded-xl p-6 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                      {job.department}
                    </span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  {selectedJob === job.id ? 'بستن' : 'جزئیات'}
                </button>
              </div>

              <p className="text-gray-300 mb-4">{job.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span>{job.experience}</span>
                </div>
              </div>

              {selectedJob === job.id && (
                <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">الزامات:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">مزایا:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setApplicationForm({...applicationForm, position: job.title})}
                  className="glow-button px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 space-x-reverse"
                >
                  <Send className="h-4 w-4" />
                  <span>درخواست</span>
                </button>
                <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                  ذخیره
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="glass rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">فرم درخواست همکاری</h2>
        <form onSubmit={handleApplicationSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">نام و نام خانوادگی *</label>
              <input
                type="text"
                required
                value={applicationForm.name}
                onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="نام کامل خود را وارد کنید"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">ایمیل *</label>
              <input
                type="email"
                required
                value={applicationForm.email}
                onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">شماره تماس</label>
              <input
                type="tel"
                value={applicationForm.phone}
                onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">موقعیت مورد نظر *</label>
              <select
                required
                value={applicationForm.position}
                onChange={(e) => setApplicationForm({...applicationForm, position: e.target.value})}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" className="bg-slate-800">انتخاب کنید</option>
                {jobOpenings.map(job => (
                  <option key={job.id} value={job.title} className="bg-slate-800">
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">سال‌های تجربه</label>
              <select
                value={applicationForm.experience}
                onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" className="bg-slate-800">انتخاب کنید</option>
                <option value="0-1" className="bg-slate-800">کمتر از ۱ سال</option>
                <option value="1-3" className="bg-slate-800">۱ تا ۳ سال</option>
                <option value="3-5" className="bg-slate-800">۳ تا ۵ سال</option>
                <option value="5+" className="bg-slate-800">بیش از ۵ سال</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">لینک پورتفولیو/رزومه</label>
              <input
                type="url"
                value={applicationForm.portfolio}
                onChange={(e) => setApplicationForm({...applicationForm, portfolio: e.target.value})}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://portfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نامه انگیزشی</label>
            <textarea
              rows={6}
              value={applicationForm.coverLetter}
              onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="چرا می‌خواهید با ما همکاری کنید؟"
            />
          </div>

          <button
            type="submit"
            className="w-full glow-button py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 space-x-reverse"
          >
            <Send className="h-5 w-5" />
            <span>ارسال درخواست</span>
          </button>
        </form>
      </section>

      {/* Contact Info */}
      <section className="mt-16 glass rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">سوالی دارید؟</h2>
        <p className="text-gray-400 mb-6">
          تیم منابع انسانی ما آماده پاسخگویی به سوالات شما است
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
                            href="mailto:hr@yadino.ir"
            className="glow-button px-6 py-3 rounded-lg font-semibold"
          >
                          hr@yadino.ir
          </a>
          <a
            href="tel:+982112345678"
            className="glass px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            ۰۲۱-۱۲۳۴۵۶۷۸
          </a>
        </div>
      </section>
    </div>
  );
}

export default CareersPage;
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <div className="glass rounded-xl p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-green-400">پیام شما ارسال شد!</h1>
          <p className="text-xl text-gray-400 mb-6">
            از تماس شما متشکریم. تیم پشتیبانی ما در اسرع وقت با شما تماس خواهد گرفت.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="glow-button px-6 py-3 rounded-lg font-semibold"
          >
            ارسال پیام جدید
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">تماس با ما</h1>
        <p className="text-xl text-gray-400">ما همیشه در کنار شما هستیم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">اطلاعات تماس</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium mb-1">تلفن پشتیبانی</div>
                  <div className="text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</div>
                  <div className="text-gray-400">۰۹۱۲-۳۴۵-۶۷۸۹</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium mb-1">ایمیل</div>
                  <div className="text-gray-400">info@yadino.ir</div>
                  <div className="text-gray-400">support@yadino.ir</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium mb-1">آدرس</div>
                  <div className="text-gray-400">
                    تهران، خیابان ولیعصر، پلاک ۱۲۳
                    <br />
                    برج تکنولوژی، طبقه ۱۰
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium mb-1">ساعات کاری</div>
                  <div className="text-gray-400">
                    شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰
                    <br />
                    پنج‌شنبه: ۹:۰۰ - ۱۳:۰۰
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">تماس سریع</h3>
            <div className="space-y-3">
              <a
                href="tel:+982112345678"
                className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5 text-green-400" />
                <span>تماس تلفنی</span>
              </a>
              <a
                href="mailto:info@yadino.ir"
                className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-400" />
                <span>ارسال ایمیل</span>
              </a>
              <button className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-white/10 rounded-lg transition-colors w-full">
                <MessageCircle className="h-5 w-5 text-purple-400" />
                <span>چت آنلاین</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6">پیام خود را ارسال کنید</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="نام کامل خود را وارد کنید"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    ایمیل *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  موضوع *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" className="bg-slate-800">موضوع پیام را انتخاب کنید</option>
                  <option value="support" className="bg-slate-800">پشتیبانی فنی</option>
                  <option value="courses" className="bg-slate-800">سوال درباره دوره‌ها</option>
                  <option value="payment" className="bg-slate-800">مشکل پرداخت</option>
                  <option value="cooperation" className="bg-slate-800">همکاری</option>
                  <option value="suggestion" className="bg-slate-800">پیشنهاد</option>
                  <option value="other" className="bg-slate-800">سایر</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  پیام *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="پیام خود را اینجا بنویسید..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glow-button py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>در حال ارسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>ارسال پیام</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">موقعیت ما</h2>
          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-400">نقشه تعاملی</p>
              <p className="text-sm text-gray-500">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <div className="mt-16 glass rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">سوالات متداول</h2>
        <p className="text-gray-400 mb-6">
          شاید جواب سوال شما در بخش سوالات متداول موجود باشد
        </p>
        <a
          href="/faq"
          className="glow-button px-6 py-3 rounded-lg font-semibold inline-block"
        >
          مشاهده سوالات متداول
        </a>
      </div>
    </div>
  );
}

export default ContactPage;
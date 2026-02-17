import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'سوالات عمومی',
      faqs: [
        {
          question: 'یادینو چیست؟',
          answer: 'یادینو یک پلتفرم آموزش آنلاین است که بیش از ۵۰۰ دوره تخصصی در زمینه‌های مختلف تکنولوژی، کسب‌وکار و هنر ارائه می‌دهد. هدف ما ارائه آموزش با کیفیت و قابل دسترس برای همه افراد است.'
        },
        {
          question: 'چگونه می‌توانم ثبت‌نام کنم؟',
          answer: 'برای ثبت‌نام کافی است روی دکمه "ثبت‌نام" در بالای صفحه کلیک کنید و فرم ثبت‌نام را تکمیل کنید. پس از تایید ایمیل، می‌توانید از تمام امکانات سایت استفاده کنید.'
        },
        {
          question: 'آیا دوره‌ها گواهی دارند؟',
          answer: 'بله، پس از اتمام موفقیت‌آمیز هر دوره، گواهی معتبری دریافت خواهید کرد که می‌توانید آن را در رزومه و شبکه‌های اجتماعی خود قرار دهید.'
        }
      ]
    },
    {
      title: 'خرید و پرداخت',
      faqs: [
        {
          question: 'چه روش‌های پرداختی پذیرفته می‌شود؟',
          answer: 'ما تمامی کارت‌های بانکی شتاب، پرداخت اینترنتی و کیف پول‌های دیجیتال را پذیرش می‌کنیم. همچنین امکان پرداخت اقساطی نیز وجود دارد.'
        },
        {
          question: 'آیا امکان بازگشت وجه وجود دارد؟',
          answer: 'بله، تا ۳۰ روز پس از خرید، در صورت عدم رضایت می‌توانید درخواست بازگشت وجه دهید. مبلغ پرداختی تا ۷ روز کاری به حساب شما بازگردانده خواهد شد.'
        },
        {
          question: 'آیا تخفیف‌هایی وجود دارد؟',
          answer: 'بله، ما به طور مرتب تخفیف‌های ویژه برای دوره‌های مختلف ارائه می‌دهیم. همچنین دانشجویان و اعضای خبرنامه از تخفیف‌های اختصاصی بهره‌مند می‌شوند.'
        }
      ]
    },
    {
      title: 'دوره‌ها و آموزش',
      faqs: [
        {
          question: 'چگونه می‌توانم دوره مناسب را انتخاب کنم؟',
          answer: 'در صفحه هر دوره، سطح دشواری، پیش‌نیازها و سرفصل‌های کامل آورده شده است. همچنین می‌توانید از پشتیبانی ما مشاوره رایگان دریافت کنید.'
        },
        {
          question: 'آیا دسترسی به دوره‌ها محدود زمانی دارد؟',
          answer: 'خیر، پس از خرید هر دوره، دسترسی مادام‌العمر به تمام محتوای آن خواهید داشت و می‌توانید در هر زمان که خواستید به آن مراجعه کنید.'
        },
        {
          question: 'آیا می‌توانم سوال از مدرس بپرسم؟',
          answer: 'بله، در هر دوره بخش سوال و جواب وجود دارد که می‌توانید سوالات خود را مطرح کنید. مدرسان معمولا تا ۲۴ ساعت پاسخ می‌دهند.'
        }
      ]
    },
    {
      title: 'فنی و پشتیبانی',
      faqs: [
        {
          question: 'چه مرورگرهایی پشتیبانی می‌شود؟',
          answer: 'پلتفرم ما با تمامی مرورگرهای مدرن شامل Chrome، Firefox، Safari و Edge سازگار است. توصیه می‌کنیم از آخرین نسخه مرورگر خود استفاده کنید.'
        },
        {
          question: 'آیا اپلیکیشن موبایل دارید؟',
          answer: 'در حال حاضر، وب‌سایت ما کاملا ریسپانسیو است و روی تمامی دستگاه‌ها به خوبی کار می‌کند. اپلیکیشن موبایل نیز به زودی عرضه خواهد شد.'
        },
        {
          question: 'در صورت مشکل فنی چه کار کنم؟',
          answer: 'می‌توانید از طریق چت آنلاین، ایمیل یا تلفن با پشتیبانی ما در تماس باشید. تیم فنی ما ۲۴ ساعته آماده خدمت‌رسانی است.'
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap((category, categoryIndex) => 
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      categoryTitle: category.title,
      globalIndex: categoryIndex * 100 + faqIndex
    }))
  );

  const filteredFaqs = allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">سوالات متداول</h1>
        <p className="text-xl text-gray-400">پاسخ سوالات رایج در مورد یادینو</p>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در سوالات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* FAQ Content */}
      {searchTerm ? (
        // Search Results
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            نتایج جستجو ({filteredFaqs.length} مورد)
          </h2>
          {filteredFaqs.map((faq) => (
            <div key={faq.globalIndex} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(faq.globalIndex)}
                className="w-full p-6 text-right flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1">{faq.question}</h3>
                  <p className="text-sm text-gray-400">{faq.categoryTitle}</p>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    openItems.includes(faq.globalIndex) ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openItems.includes(faq.globalIndex) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
              <p className="text-gray-400">لطفا کلمات جستجو را تغییر دهید</p>
            </div>
          )}
        </div>
      ) : (
        // Categories
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="glass rounded-xl overflow-hidden">
              <div className="bg-white/5 p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              <div className="divide-y divide-white/10">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-right flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                        <ChevronDown 
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            openItems.includes(globalIndex) ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {openItems.includes(globalIndex) && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Support */}
      <div className="glass rounded-xl p-8 mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">سوال شما پاسخ داده نشد؟</h2>
        <p className="text-gray-400 mb-6">
          تیم پشتیبانی ما آماده پاسخگویی به سوالات شما است
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/contact"
            className="flex items-center justify-center space-x-2 space-x-reverse glow-button py-3 rounded-lg font-semibold"
          >
            <MessageCircle className="h-5 w-5" />
            <span>چت آنلاین</span>
          </a>
          <a
            href="tel:+982112345678"
            className="flex items-center justify-center space-x-2 space-x-reverse glass py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>تماس تلفنی</span>
          </a>
          <a
                            href="mailto:support@yadino.ir"
            className="flex items-center justify-center space-x-2 space-x-reverse glass py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>ارسال ایمیل</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <img
                src="/images/logo/medinfo-logo.png"
                alt="MedInfo Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gradient">مد اینفو</span>
            </div>

            <p className="text-gray-400 mb-4 leading-relaxed">
              مد اینفو پلتفرم تخصصی آموزش پزشکی و سلامت است.
              با ارائه دوره‌های معتبر، محتوای علمی و مسیرهای یادگیری حرفه‌ای،
              به شما کمک می‌کنیم در مسیر رشد شغلی و علمی خود یک قدم جلوتر باشید.
            </p>

            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">تماس با ما</Link></li>
              <li><Link to="/payment-failed" className="text-gray-400 hover:text-purple-400 transition-colors">خرید ناموفق</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-purple-400 transition-colors">انجمن</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">درباره ما</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-purple-400 transition-colors">فرصت‌های شغلی</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">پشتیبانی</h3>
            <ul className="space-y-2">
              <li><Link to="/help-center" className="text-gray-400 hover:text-purple-400 transition-colors">مرکز راهنمایی</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">سوالات متداول</Link></li>
              <li><Link to="/newsletter" className="text-gray-400 hover:text-purple-400 transition-colors">خبرنامه</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">قوانین و مقررات</Link></li>
              <li><a href="tel:+989123456789" className="text-gray-400 hover:text-purple-400 transition-colors">۰۹۱۲-۳۴۵-۶۷۸۹</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © ۱۴۰۳ مد اینفو. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

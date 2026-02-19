import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import NotificationSystem from './NotificationSystem';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    {
      name: 'خانه',
      href: '/',
      hasDropdown: true,
      dropdownItems: [
        { name: 'خانه ۱', href: '/' },
        { name: 'خانه ۲', href: '/home2' },
        { name: 'خانه ۳', href: '/home3' },
      ],
    },
    {
      name: 'فروش ‌ویژه',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'فروش ویژه یک', href: '/special-sale-1' },
        { name: 'فروش ویژه دو', href: '/special-sale-2' },
      ],
    },
    {
      name: 'صفحات',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'مرکز موفقیت', href: '/gamification' },
        { name: 'ثبت‌نام جدید', href: '/register-new' },
        { name: 'ورود جدید', href: '/login-new' },
        { name: 'تایید کد', href: '/verify-code' },
        { name: 'تایید ورود', href: '/verify-login-code' },
        { name: 'موفقیت ثبت‌نام', href: '/registration-success' },
        { name: 'مرکز راهنما 2', href: '/help' },
      ],
    },
    { name: 'دوره ها', href: '/courses' },
    { name: 'مدرسان', href: '/instructors' },
    { name: 'انجمن', href: '/community' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'راهنما', href: '/help-center' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const baseMenuItemClass =
    'inline-flex items-center justify-center px-2 py-2 h-10 rounded-md text-sm font-medium transition-all duration-200 text-center';

  // -----------------------------
  // 🔥 Dropdown Hover Logic (نسخه A)
  // -----------------------------
  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 200);

    setDropdownTimeout(timeout);
  };

  return (
    <header className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* MOBILE HEADER */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <img
                src="/images/logo/medinfo-logo.png"
                alt="MedInfo Logo"
                className="h-6 w-auto"
              />
              <span className="text-lg font-bold text-gradient">مد اینفو</span>
            </Link>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                <ShoppingCart className="h-6 w-6 text-gray-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === 'user' ? null : 'user')
                    }
                    className="flex items-center space-x-2 space-x-reverse p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <User className="h-6 w-6 text-gray-300" />
                  </button>

                  {openDropdown === 'user' && (
                    <div className="absolute left-0 mt-2 w-48 glass rounded-md shadow-lg border border-white/10 z-50">
                      <div className="py-1">
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">داشبورد</Link>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">پروفایل</Link>
                        <Link to="/notifications" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 flex items-center justify-between">
                          <span>اعلان‌ها</span>
                          <NotificationSystem variant="inline" />
                        </Link>
                        <Link to="/wallet" className="block px-4 py-2 text-sm text-white hover:bg-white/10">کیف پول</Link>
                        <Link to="/newsletter" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">خبرنامه</Link>
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">پنل مدیریت</Link>
                        <button onClick={logout} className="block w-full text-right px-4 py-2 text-sm text-gray-300 hover:bg-white/10">خروج</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <User className="h-6 w-6 text-gray-300" />
                </Link>
              )}
            </div>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <img
                src="/images/logo/medinfo-logo.png"
                alt="MedInfo Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gradient">مد اینفو</span>
            </Link>

            <nav className="flex space-x-6 space-x-reverse">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === item.name ? null : item.name);
                        }}
                        className={`${baseMenuItemClass} gap-1 cursor-pointer ${
                          item.dropdownItems.some((d) => isActive(d.href))
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-gray-300 hover:text-purple-400 hover:bg-purple-400/5'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {openDropdown === item.name && (
                        <div className="absolute top-full right-0 mt-1 w-48 glass rounded-md shadow-lg border border-white/10 z-50">
                          <div className="py-1">
                            {item.dropdownItems.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  isActive(dropdownItem.href)
                                    ? 'text-purple-400 bg-purple-400/10'
                                    : 'text-gray-300 hover:text-purple-400 hover:bg-white/10'
                                }`}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`${baseMenuItemClass} ${
                        isActive(item.href)
                          ? 'text-purple-400 bg-purple-400/10'
                          : 'text-gray-300 hover:text-purple-400 hover:bg-purple-400/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                <ShoppingCart className="h-6 w-6 text-gray-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === 'user-desktop' ? null : 'user-desktop')
                    }
                    className="flex items-center space-x-2 space-x-reverse p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <User className="h-6 w-6 text-gray-300" />
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </button>

                  {openDropdown === 'user-desktop' && (
                    <div className="absolute left-0 mt-2 w-48 glass rounded-md shadow-lg border border-white/10 z-50">
                      <div className="py-1">
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">داشبورد</Link>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg:white/10 hover:bg-white/10">پروفایل</Link>
                        <Link to="/notifications" className="block px-4 py-2 text-sm text-gray-300 hover:bg:white/10 hover:bg-white/10 flex items-center justify-between">
                          <span>اعلان‌ها</span>
                          <NotificationSystem variant="inline" />
                        </Link>
                        <Link to="/wallet" className="block px-4 py-2 text-sm text-white hover:bg-white/10">کیف پول</Link>
                        <Link to="/newsletter" className="block px-4 py-2 text-sm text-gray-300 hover:bg:white/10 hover:bg-white/10">خبرنامه</Link>
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg:white/10 hover:bg-white/10">پنل مدیریت</Link>
                        <button onClick={logout} className="block w-full text-right px-4 py-2 text-sm text-gray-300 hover:bg-white/10">خروج</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors">ورود</Link>
                  <Link to="/register" className="glow-button px-4 py-2 rounded-md text-sm font-medium text-white">ثبت‌نام</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE NAV MENU */}
        {isMenuOpen && (
          <div className="md:hidden relative z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.name ? null : item.name)
                        }
                        className="w-full text-right px-3 py-2 text-base font-medium text-gray-300 hover:text-purple-400 transition-colors flex justify-between items-center"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {openDropdown === item.name && (
                        <div className="pr-6 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block py-2 px-3 rounded-md text-sm text-gray-300 hover:text-purple-400 hover:bg-purple-400/5 transition-colors text-right"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors text-right ${
                        isActive(item.href)
                          ? 'text-purple-400 bg-purple-400/10'
                          : 'text-gray-300 hover:text-purple-400 hover:bg-purple-400/5'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

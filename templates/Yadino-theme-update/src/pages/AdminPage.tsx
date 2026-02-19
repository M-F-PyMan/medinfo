
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  ShoppingCart, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Eye,
  Reply,
  Save,
  Upload,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';

// Login Component
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (credentials.username === 'demo' && credentials.password === 'demo') {
      onLogin();
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 rtl">
      <div className="glass rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">پنل مدیریت</h1>
          <p className="text-gray-400">وارد حساب کاربری خود شوید</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نام کاربری / ایمیل
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="demo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full glow-button py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Preloader Component
const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-20 h-20 glass rounded-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 w-20 h-20 border-2 border-purple-500/30 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

// Main Admin Panel Component
function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const [courses, setCourses] = useState([
    { id: 1, title: 'دوره React', price: 199000, status: 'active', students: 150 },
    { id: 2, title: 'دوره Vue.js', price: 179000, status: 'active', students: 120 },
    { id: 3, title: 'دوره Node.js', price: 229000, status: 'inactive', students: 80 }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'علی احمدی', email: 'ali@example.com', role: 'student', joinDate: '۱۴۰۳/۰۸/۱۵' },
    { id: 2, name: 'مریم رضایی', email: 'maryam@example.com', role: 'instructor', joinDate: '۱۴۰۳/۰۷/۲۰' },
    { id: 3, name: 'حسین کریمی', email: 'hossein@example.com', role: 'student', joinDate: '۱۴۰۳/۰۸/۱۰' }
  ]);

  const [orders, setOrders] = useState([
    { id: 1, user: 'علی احمدی', course: 'دوره React', amount: 199000, status: 'completed', date: '۱۴۰۳/۰۸/۲۰' },
    { id: 2, user: 'مریم رضایی', course: 'دوره Vue.js', amount: 179000, status: 'pending', date: '۱۴۰۳/۰۸/۱۹' },
    { id: 3, user: 'حسین کریمی', course: 'دوره Node.js', amount: 229000, status: 'completed', date: '۱۴۰۳/۰۸/۱۸' }
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, user: 'علی احمدی', subject: 'مشکل در دسترسی به دوره', status: 'open', date: '۱۴۰۳/۰۸/۲۰' },
    { id: 2, user: 'مریم رضایی', subject: 'درخواست بازپرداخت', status: 'closed', date: '۱۴۰۳/۰۸/۱۹' }
  ]);

  const [pages, setPages] = useState([
    { id: 1, title: 'درباره ما', slug: 'about', status: 'published' },
    { id: 2, title: 'تماس با ما', slug: 'contact', status: 'published' },
    { id: 3, title: 'قوانین و مقررات', slug: 'terms', status: 'draft' }
  ]);

  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'آینده برنامه‌نویسی', author: 'احمد رضایی', status: 'published', date: '۱۴۰۳/۰۸/۲۰' },
    { id: 2, title: 'یادگیری React', author: 'مریم احمدی', status: 'draft', date: '۱۴۰۳/۰۸/۱۹' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', name: 'داشبورد', icon: Home },
    { id: 'courses', name: 'دوره‌ها', icon: BookOpen },
    { id: 'users', name: 'کاربران', icon: Users },
    { id: 'orders', name: 'سفارشات', icon: ShoppingCart },
    { id: 'pages', name: 'صفحات', icon: FileText },
    { id: 'blog', name: 'وبلاگ', icon: MessageSquare },
    { id: 'tickets', name: 'تیکت‌ها', icon: MessageSquare },
    { id: 'settings', name: 'تنظیمات', icon: Settings }
  ];

  const exportToExcel = () => {
    // Mock export functionality
    alert('فایل اکسل در حال دانلود است...');
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">داشبورد</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">کل کاربران</p>
              <p className="text-2xl font-bold text-white">۱,۲۳۴</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">دوره‌های فعال</p>
              <p className="text-2xl font-bold text-white">۴۵</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">کل درآمد</p>
              <p className="text-2xl font-bold text-white">۱۲,۵۰۰,۰۰۰</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">ثبت‌نام جدید</p>
              <p className="text-2xl font-bold text-white">۸۹</p>
            </div>
            <UserPlus className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">آمار فروش</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="h-16 w-16 text-purple-400" />
            <p className="text-gray-400 mr-4">نمودار آمار فروش</p>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">فعالیت‌های اخیر</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-gray-300">کاربر جدید ثبت‌نام کرد</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-gray-300">دوره جدید اضافه شد</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-gray-300">سفارش جدید دریافت شد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">دوره‌ها</h1>
        <button className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
          <Plus className="h-4 w-4" />
          <span>دوره جدید</span>
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در دوره‌ها..."
              className="w-full pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">عنوان</th>
                <th className="text-right py-3 text-gray-400">قیمت</th>
                <th className="text-right py-3 text-gray-400">دانشجو</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-white/5">
                  <td className="py-4 text-white">{course.title}</td>
                  <td className="py-4 text-white">{course.price.toLocaleString('fa')} تومان</td>
                  <td className="py-4 text-white">{course.students} نفر</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {course.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Edit className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">کاربران</h1>
        <button className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
          <Plus className="h-4 w-4" />
          <span>کاربر جدید</span>
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در کاربران..."
              className="w-full pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">نام</th>
                <th className="text-right py-3 text-gray-400">ایمیل</th>
                <th className="text-right py-3 text-gray-400">نقش</th>
                <th className="text-right py-3 text-gray-400">تاریخ عضویت</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="py-4 text-white">{user.name}</td>
                  <td className="py-4 text-white">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'instructor' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {user.role === 'instructor' ? 'مدرس' : 'دانشجو'}
                    </span>
                  </td>
                  <td className="py-4 text-white">{user.joinDate}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Edit className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">سفارشات</h1>
        <button 
          onClick={exportToExcel}
          className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse"
        >
          <Download className="h-4 w-4" />
          <span>خروجی اکسل</span>
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در سفارشات..."
              className="w-full pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">کاربر</th>
                <th className="text-right py-3 text-gray-400">دوره</th>
                <th className="text-right py-3 text-gray-400">مبلغ</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5">
                  <td className="py-4 text-white">{order.user}</td>
                  <td className="py-4 text-white">{order.course}</td>
                  <td className="py-4 text-white">{order.amount.toLocaleString('fa')} تومان</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status === 'completed' ? 'تکمیل شده' : 'در انتظار'}
                    </span>
                  </td>
                  <td className="py-4 text-white">{order.date}</td>
                  <td className="py-4">
                    <button className="p-1 hover:bg-white/10 rounded">
                      <Eye className="h-4 w-4 text-blue-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">صفحات</h1>
        <button className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
          <Plus className="h-4 w-4" />
          <span>صفحه جدید</span>
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">عنوان</th>
                <th className="text-right py-3 text-gray-400">نامک</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-white/5">
                  <td className="py-4 text-white">{page.title}</td>
                  <td className="py-4 text-white">{page.slug}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      page.status === 'published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {page.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Edit className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">وبلاگ</h1>
        <button className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
          <Plus className="h-4 w-4" />
          <span>مقاله جدید</span>
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">عنوان</th>
                <th className="text-right py-3 text-gray-400">نویسنده</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post.id} className="border-b border-white/5">
                  <td className="py-4 text-white">{post.title}</td>
                  <td className="py-4 text-white">{post.author}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="py-4 text-white">{post.date}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Edit className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">تیکت‌ها</h1>
        <button className="glow-button px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
          <Plus className="h-4 w-4" />
          <span>تیکت جدید</span>
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 text-gray-400">کاربر</th>
                <th className="text-right py-3 text-gray-400">موضوع</th>
                <th className="text-right py-3 text-gray-400">وضعیت</th>
                <th className="text-right py-3 text-gray-400">تاریخ</th>
                <th className="text-right py-3 text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-white/5">
                  <td className="py-4 text-white">{ticket.user}</td>
                  <td className="py-4 text-white">{ticket.subject}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'open' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {ticket.status === 'open' ? 'باز' : 'بسته'}
                    </span>
                  </td>
                  <td className="py-4 text-white">{ticket.date}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Eye className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Reply className="h-4 w-4 text-green-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">تنظیمات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Settings */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">تنظیمات سایت</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">نام سایت</label>
              <input
                type="text"
                defaultValue="یادینو"
                className="w-full py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">لوگو</label>
              <button className="w-full py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
                <Upload className="h-4 w-4" />
                <span>آپلود لوگو</span>
              </button>
            </div>
            <button className="glow-button w-full py-2 rounded-lg flex items-center justify-center space-x-2 space-x-reverse">
              <Save className="h-4 w-4" />
              <span>ذخیره</span>
            </button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">تنظیمات ظاهری</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">رنگ اصلی</label>
              <input
                type="color"
                defaultValue="#8B5CF6"
                className="w-full h-10 bg-white/5 border border-white/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">فونت</label>
              <select className="w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 rounded-xl" style={{ backgroundColor: '#192436' }}>
                <option value="vazir">وزیر</option>
                <option value="iran-sans">ایران سنس</option>
                <option value="shabnam">شبنم</option>
              </select>
            </div>
            <button className="glow-button w-full py-2 rounded-lg flex items-center justify-center space-x-2 space-x-reverse">
              <Save className="h-4 w-4" />
              <span>ذخیره</span>
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">تنظیمات امنیتی</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">احراز هویت دو مرحله‌ای</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-0" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">ورود با ایمیل</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-0" />
              </button>
            </div>
            <button className="glow-button w-full py-2 rounded-lg flex items-center justify-center space-x-2 space-x-reverse">
              <Save className="h-4 w-4" />
              <span>ذخیره</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'courses': return renderCourses();
      case 'users': return renderUsers();
      case 'orders': return renderOrders();
      case 'pages': return renderPages();
      case 'blog': return renderBlog();
      case 'tickets': return renderTickets();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 rtl">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 glass border-l border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">پنل مدیریت</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:mr-64">
        {/* Header */}
        <header className="glass border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu className="h-5 w-5 text-gray-400" />
            </button>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <p className="text-white font-medium">rayamir</p>
                <p className="text-gray-400 text-sm">مدیر سیستم</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">R</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
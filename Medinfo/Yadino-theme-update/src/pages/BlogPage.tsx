import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag, Search, TrendingUp } from 'lucide-react';

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه مقالات' },
    { id: 'programming', name: 'برنامه‌نویسی' },
    { id: 'design', name: 'طراحی' },
    { id: 'business', name: 'کسب‌وکار' },
    { id: 'technology', name: 'تکنولوژی' }
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'آینده برنامه‌نویسی: تکنولوژی‌هایی که باید بلد باشید',
      excerpt: 'بررسی جدیدترین تکنولوژی‌های برنامه‌نویسی که در سال ۱۴۰۳ باید یاد بگیرید',
      author: 'احمد رضایی',
      date: '۱۴۰۳/۰۸/۲۰',
      readTime: '۵ دقیقه',
      views: 1234,
      category: 'programming',
      tags: ['React', 'JavaScript', 'آینده'],
      image: './images/pexels-photo-11035380.jpeg',
      featured: true
    },
    {
      id: '2',
      title: 'اصول طراحی UI/UX که هر طراح باید بداند',
      excerpt: 'راهنمای کامل برای یادگیری اصول اولیه طراحی رابط کاربری و تجربه کاربری',
      author: 'مریم احمدی',
      date: '۱۴۰۳/۰۸/۱۸',
      readTime: '۷ دقیقه',
      views: 892,
      category: 'design',
      tags: ['UI', 'UX', 'طراحی'],
      image: './images/pexels-photo-196644.jpeg',
      featured: false
    },
    {
      id: '3',
      title: 'استراتژی‌های موثر دیجیتال مارکتینگ در ۲۰۲۴',
      excerpt: 'بررسی جدیدترین تکنیک‌های بازاریابی دیجیتال و نحوه پیاده‌سازی آنها',
      author: 'محمد حسنی',
      date: '۱۴۰۳/۰۸/۱۵',
      readTime: '۶ دقیقه',
      views: 756,
      category: 'business',
      tags: ['مارکتینگ', 'استراتژی', 'کسب‌وکار'],
      image: './images/pexels-photo-265087.jpeg',
      featured: false
    },
    {
      id: '4',
      title: 'هوش مصنوعی و تاثیر آن بر آموزش آنلاین',
      excerpt: 'چگونه هوش مصنوعی در حال تغییر روش‌های آموزش و یادگیری است',
      author: 'سارا میرزایی',
      date: '۱۴۰۳/۰۸/۱۲',
      readTime: '۸ دقیقه',
      views: 1567,
      category: 'technology',
      tags: ['هوش مصنوعی', 'آموزش', 'تکنولوژی'],
      image: './images/pexels-photo-8386440.jpeg',
      featured: true
    },
    {
      id: '5',
      title: 'راهنمای شروع کسب‌وکار آنلاین',
      excerpt: 'قدم به قدم نحوه شروع یک کسب‌وکار آنلاین موفق را یاد بگیرید',
      author: 'علی پورمحمد',
      date: '۱۴۰۳/۰۸/۱۰',
      readTime: '۱۰ دقیقه',
      views: 2103,
      category: 'business',
      tags: ['استارتاپ', 'کسب‌وکار', 'راهنما'],
      image: './images/pexels-photo-3184292.jpeg',
      featured: false
    },
    {
      id: '6',
      title: 'بهترین ابزارهای طراحی در سال ۲۰۲۴',
      excerpt: 'معرفی و بررسی بهترین نرم‌افزارها و ابزارهای طراحی گرافیک و UI/UX',
      author: 'نازنین کرمی',
      date: '۱۴۰۳/۰۸/۰۸',
      readTime: '۴ دقیقه',
      views: 645,
      category: 'design',
      tags: ['ابزار', 'نرم‌افزار', 'طراحی'],
      image: './images/pexels-photo-196644.jpeg',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">وبلاگ یادینو</h1>
        <p className="text-xl text-gray-400">آخرین مقالات و نکات آموزشی</p>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-xl p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id} className="bg-slate-800">
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="glass rounded-xl overflow-hidden mb-12 card-hover">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-48 sm:h-64 lg:h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-purple-500 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 space-x-reverse">
                <TrendingUp className="h-4 w-4" />
                <span>مقاله ویژه</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 space-x-reverse mb-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{featuredPost.views.toLocaleString('fa')}</span>
                </div>
              </div>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 leading-tight">
                <Link to={`/blog/${featuredPost.id}`} className="hover:text-purple-400 transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>
              
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">{featuredPost.excerpt}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="glow-button px-4 py-2 rounded-lg text-sm font-medium self-start sm:self-auto"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {regularPosts.map((post) => (
          <article key={post.id} className="glass rounded-xl overflow-hidden card-hover">
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs">
                {post.readTime}
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 space-x-reverse mb-3 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold mb-3 line-clamp-2">
                <Link to={`/blog/${post.id}`} className="hover:text-purple-400 transition-colors">
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3 space-x-reverse text-xs text-gray-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="h-3 w-3" />
                    <span>{post.views.toLocaleString('fa')}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Tag className="h-3 w-3" />
                    <span>{post.tags[0]}</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium self-start sm:self-auto"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold mb-2">هیچ مقاله‌ای یافت نشد</h3>
          <p className="text-gray-400">لطفا کلمات جستجو یا فیلترها را تغییر دهید</p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 glass rounded-xl p-4 sm:p-6 lg:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">عضویت در خبرنامه</h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          از آخرین مقالات و نکات آموزشی با خبر شوید
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="glow-button px-6 py-3 rounded-lg font-semibold">
            عضویت
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
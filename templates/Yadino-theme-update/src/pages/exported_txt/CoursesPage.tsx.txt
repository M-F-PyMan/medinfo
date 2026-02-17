import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, Filter, Search } from 'lucide-react';

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'همه دوره‌ها' },
    { id: 'programming', name: 'برنامه‌نویسی' },
    { id: 'design', name: 'طراحی' },
    { id: 'marketing', name: 'مارکتینگ' },
    { id: 'business', name: 'کسب‌وکار' }
  ];

  const courses = [
    {
      id: '1',
      title: 'دوره کامل React و JavaScript مدرن',
      instructor: 'احمد رضایی',
      category: 'programming',
      rating: 4.9,
      students: 1250,
      duration: '۲۵ ساعت',
      price: 199000,
      originalPrice: 299000,
      image: './images/pexels-photo-11035380.jpeg',
      level: 'متوسط',
      description: 'آموزش کامل React از صفر تا صد با پروژه‌های عملی'
    },
    {
      id: '2',
      title: 'طراحی UI/UX حرفه‌ای با Figma',
      instructor: 'مریم احمدی',
      category: 'design',
      rating: 4.8,
      students: 890,
      duration: '۳۰ ساعت',
      price: 299000,
      originalPrice: 399000,
      image: './images/pexels-photo-196644.jpeg',
      level: 'مقدماتی',
      description: 'یادگیری اصول طراحی رابط کاربری و تجربه کاربری'
    },
    {
      id: '3',
      title: 'دیجیتال مارکتینگ پیشرفته',
      instructor: 'محمد حسنی',
      category: 'marketing',
      rating: 4.7,
      students: 2100,
      duration: '۲۰ ساعت',
      price: 149000,
      originalPrice: 249000,
      image: './images/pexels-photo-265087.jpeg',
      level: 'پیشرفته',
      description: 'استراتژی‌های بازاریابی دیجیتال برای کسب‌وکارها'
    },
    {
      id: '4',
      title: 'Python برای علم داده',
      instructor: 'سارا میرزایی',
      category: 'programming',
      rating: 4.6,
      students: 750,
      duration: '۳۵ ساعت',
      price: 249000,
      originalPrice: 349000,
      image: './images/pexels-photo-1181244.jpeg',
      level: 'متوسط',
      description: 'تحلیل داده و یادگیری ماشین با Python'
    },
    {
      id: '5',
      title: 'مدیریت کسب‌وکار دیجیتال',
      instructor: 'علی پورمحمد',
      category: 'business',
      rating: 4.5,
      students: 650,
      duration: '۱۸ ساعت',
      price: 179000,
      originalPrice: 279000,
      image: './images/pexels-photo-3184292.jpeg',
      level: 'مقدماتی',
      description: 'اصول مدیریت استارتاپ و کسب‌وکارهای نوپا'
    },
    {
      id: '6',
      title: 'طراحی گرافیک و برندینگ',
      instructor: 'نازنین کرمی',
      category: 'design',
      rating: 4.4,
      students: 920,
      duration: '۲۸ ساعت',
      price: 189000,
      originalPrice: 289000,
      image: './images/pexels-photo-196644.jpeg',
      level: 'مقدماتی',
      description: 'اصول طراحی گرافیک و ساخت هویت بصری'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'under200' && course.price < 200000) ||
                        (priceRange === '200to300' && course.price >= 200000 && course.price < 300000) ||
                        (priceRange === 'over300' && course.price >= 300000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">دوره‌های آموزشی</h1>
        <p className="text-xl text-gray-400">بیش از ۵۰۰ دوره در زمینه‌های مختلف</p>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در دوره‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category Filter */}
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

          {/* Price Filter */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all" className="bg-slate-800">همه قیمت‌ها</option>
            <option value="under200" className="bg-slate-800">زیر ۲۰۰ هزار تومان</option>
            <option value="200to300" className="bg-slate-800">۲۰۰-۳۰۰ هزار تومان</option>
            <option value="over300" className="bg-slate-800">بالای ۳۰۰ هزار تومان</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center justify-center space-x-2 space-x-reverse glow-button py-3 px-4 rounded-lg">
            <Filter className="h-5 w-5" />
            <span>اعمال فیلتر</span>
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="glass rounded-xl overflow-hidden card-hover">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                {course.level}
              </div>
              {course.originalPrice > course.price && (
                <div className="absolute top-4 left-4 bg-red-500 px-2 py-1 rounded-full text-xs font-medium">
                  %{Math.round((course.originalPrice - course.price) / course.originalPrice * 100)} تخفیف
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-gray-400 mb-3">مدرس: {course.instructor}</p>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
              
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

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-purple-400">
                    {course.price.toLocaleString('fa')} تومان
                  </span>
                  {course.originalPrice > course.price && (
                    <span className="text-gray-500 line-through text-sm mr-2">
                      {course.originalPrice.toLocaleString('fa')}
                    </span>
                  )}
                </div>
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

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold mb-2">هیچ دوره‌ای یافت نشد</h3>
          <p className="text-gray-400">لطفا فیلترهای جستجو را تغییر دهید</p>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
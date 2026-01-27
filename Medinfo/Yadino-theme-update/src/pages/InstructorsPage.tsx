import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, Search, Filter, MapPin, Award } from 'lucide-react';

function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه مدرسان' },
    { id: 'programming', name: 'برنامه‌نویسی' },
    { id: 'design', name: 'طراحی' },
    { id: 'marketing', name: 'مارکتینگ' },
    { id: 'business', name: 'کسب‌وکار' }
  ];

  const instructors = [
    {
      id: '1',
      name: 'احمد رضایی',
      title: 'متخصص React و JavaScript',
      category: 'programming',
      experience: '۸ سال تجربه',
      students: 3500,
      courses: 12,
      rating: 4.9,
      image: './images/pexels-photo-1043471.jpeg',
      bio: 'توسعه‌دهنده Frontend ارشد با تجربه کار در شرکت‌های بزرگ تکنولوژی',
      location: 'تهران',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js']
    },
    {
      id: '2',
      name: 'مریم احمدی',
      title: 'طراح UI/UX حرفه‌ای',
      category: 'design',
      experience: '۶ سال تجربه',
      students: 2800,
      courses: 8,
      rating: 4.8,
      image: './images/pexels-photo-1239291.jpeg',
      bio: 'طراح خلاق با تجربه طراحی برای استارتاپ‌ها و شرکت‌های بزرگ',
      location: 'تهران',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping']
    },
    {
      id: '3',
      name: 'محمد حسنی',
      title: 'متخصص دیجیتال مارکتینگ',
      category: 'marketing',
      experience: '۱۰ سال تجربه',
      students: 4200,
      courses: 15,
      rating: 4.7,
      image: './images/pexels-photo-1222271.jpeg',
      bio: 'مشاور بازاریابی دیجیتال با سابقه همکاری با برندهای معتبر',
      location: 'اصفهان',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics']
    },
    {
      id: '4',
      name: 'سارا میرزایی',
      title: 'متخصص علم داده',
      category: 'programming',
      experience: '۷ سال تجربه',
      students: 1900,
      courses: 6,
      rating: 4.6,
      image: './images/pexels-photo-1181519.jpeg',
      bio: 'دانشمند داده با تخصص در یادگیری ماشین و هوش مصنوعی',
      location: 'تهران',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis']
    },
    {
      id: '5',
      name: 'علی پورمحمد',
      title: 'مدیر کسب‌وکار',
      category: 'business',
      experience: '۱۲ سال تجربه',
      students: 3100,
      courses: 10,
      rating: 4.5,
      image: './images/pexels-photo-1043474.jpeg',
      bio: 'کارآفرین موفق و مشاور استراتژی کسب‌وکار',
      location: 'مشهد',
      skills: ['Strategy', 'Leadership', 'Finance', 'Operations']
    },
    {
      id: '6',
      name: 'نازنین کرمی',
      title: 'طراح گرافیک',
      category: 'design',
      experience: '۵ سال تجربه',
      students: 2200,
      courses: 7,
      rating: 4.4,
      image: './images/pexels-photo-1181686.jpeg',
      bio: 'طراح گرافیک خلاق با تخصص در برندینگ و هویت بصری',
      location: 'شیراز',
      skills: ['Photoshop', 'Illustrator', 'Branding', 'Print Design']
    },
    {
      id: '7',
      name: 'حسین کریمی',
      title: 'توسعه‌دهنده Backend',
      category: 'programming',
      experience: '۹ سال تجربه',
      students: 2600,
      courses: 9,
      rating: 4.8,
      image: './images/pexels-photo-1043473.jpeg',
      bio: 'متخصص معماری نرم‌افزار و توسعه سیستم‌های مقیاس‌پذیر',
      location: 'تبریز',
      skills: ['Node.js', 'Python', 'Docker', 'AWS']
    },
    {
      id: '8',
      name: 'فاطمه صادقی',
      title: 'متخصص SEO',
      category: 'marketing',
      experience: '۴ سال تجربه',
      students: 1800,
      courses: 5,
      rating: 4.6,
      image: './images/pexels-photo-1181690.jpeg',
      bio: 'متخصص بهینه‌سازی موتورهای جستجو و بازاریابی محتوا',
      location: 'کرج',
      skills: ['SEO', 'Content Marketing', 'Google Analytics', 'SEM']
    }
  ];

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || instructor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">مدرسان یادینو</h1>
        <p className="text-xl text-gray-400">با بهترین متخصصان صنعت آشنا شوید</p>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در مدرسان..."
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{instructors.length}</div>
          <div className="text-gray-400">مدرس خبره</div>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {instructors.reduce((sum, instructor) => sum + instructor.students, 0).toLocaleString('fa')}
          </div>
          <div className="text-gray-400">دانشجو</div>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {instructors.reduce((sum, instructor) => sum + instructor.courses, 0)}
          </div>
          <div className="text-gray-400">دوره آموزشی</div>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {(instructors.reduce((sum, instructor) => sum + instructor.rating, 0) / instructors.length).toFixed(1)}
          </div>
          <div className="text-gray-400">میانگین امتیاز</div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredInstructors.map((instructor) => (
          <div key={instructor.id} className="glass rounded-xl overflow-hidden card-hover">
            <div className="relative">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                {instructor.experience}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
              <p className="text-purple-400 mb-3">{instructor.title}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{instructor.bio}</p>
              
              <div className="flex items-center space-x-2 space-x-reverse mb-4 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{instructor.location}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {instructor.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {instructor.skills.length > 3 && (
                  <span className="text-gray-400 text-xs">+{instructor.skills.length - 3}</span>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{instructor.rating}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{instructor.students.toLocaleString('fa')} نفر</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                  <BookOpen className="h-4 w-4" />
                  <span>{instructor.courses} دوره</span>
                </div>
              </div>

              <Link
                to={`/instructor/${instructor.id}`}
                className="w-full glow-button py-2 rounded-lg text-sm font-medium text-center block"
              >
                مشاهده پروفایل
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredInstructors.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👨‍🏫</div>
          <h3 className="text-2xl font-semibold mb-2">هیچ مدرسی یافت نشد</h3>
          <p className="text-gray-400">لطفا کلمات جستجو یا فیلترها را تغییر دهید</p>
        </div>
      )}

      {/* Join as Instructor */}
      <div className="mt-16 glass rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">مدرس هستید؟</h2>
        <p className="text-gray-400 mb-6">
          به جمع مدرسان ما بپیوندید و تجربه و دانش خود را با هزاران دانشجو به اشتراک بگذارید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="glow-button px-8 py-4 rounded-lg font-semibold"
          >
            درخواست همکاری
          </Link>
          <Link
            to="/about"
            className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            اطلاعات بیشتر
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstructorsPage;
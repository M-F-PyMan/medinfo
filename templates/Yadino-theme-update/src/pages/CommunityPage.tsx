import React, { useState } from 'react';
import { Users, MessageCircle, Heart,  Calendar, Award, TrendingUp, Plus, Search, Filter } from 'lucide-react';

function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه موضوعات' },
    { id: 'programming', name: 'برنامه‌نویسی' },
    { id: 'design', name: 'طراحی' },
    { id: 'career', name: 'مسیر شغلی' },
    { id: 'projects', name: 'پروژه‌ها' },
    { id: 'help', name: 'کمک و راهنمایی' }
  ];

  const discussions = [
    {
      id: '1',
      title: 'بهترین روش یادگیری React برای مبتدیان چیست؟',
      author: 'علی محمدی',
      avatar: './images/pexels-photo-1043471.jpeg',
      category: 'programming',
      replies: 23,
      likes: 45,
      views: 234,
      timeAgo: '۲ ساعت پیش',
      tags: ['React', 'مبتدی', 'JavaScript'],
      excerpt: 'سلام دوستان، من تازه شروع کردم به یادگیری React و نمی‌دونم از کجا شروع کنم...'
    },
    {
      id: '2',
      title: 'نمونه کارهای طراحی UI/UX برای پورتفولیو',
      author: 'مریم احمدی',
      avatar: './images/pexels-photo-1239291.jpeg',
      category: 'design',
      replies: 18,
      likes: 67,
      views: 189,
      timeAgo: '۴ ساعت پیش',
      tags: ['UI/UX', 'Portfolio', 'طراحی'],
      excerpt: 'چه نوع پروژه‌هایی رو باید تو پورتفولیوم قرار بدم که جذاب باشه؟'
    },
    {
      id: '3',
      title: 'تجربه من از تغییر مسیر شغلی به برنامه‌نویسی',
      author: 'حسین کریمی',
      avatar: './images/pexels-photo-1222271.jpeg',
      category: 'career',
      replies: 31,
      likes: 89,
      views: 456,
      timeAgo: '۱ روز پیش',
      tags: ['Career Change', 'تجربه', 'انگیزشی'],
      excerpt: 'سلام، می‌خواستم تجربه‌م از تغییر شغل از حسابداری به برنامه‌نویسی رو باهاتون به اشتراک بذارم...'
    },
    {
      id: '4',
      title: 'پروژه تیمی: ساخت اپلیکیشن مدیریت وظایف',
      author: 'سارا میرزایی',
      avatar: './images/pexels-photo-1181519.jpeg',
      category: 'projects',
      replies: 12,
      likes: 34,
      views: 123,
      timeAgo: '۳ روز پیش',
      tags: ['پروژه تیمی', 'React', 'Node.js'],
      excerpt: 'دنبال چند نفر هستم که بخوان تو پروژه Todo App مشارکت کنن...'
    }
  ];

  const topMembers = [
    {
      name: 'احمد رضایی',
      avatar: './images/pexels-photo-1043471.jpeg',
      role: 'مدرس React',
      points: 2450,
      badge: 'Expert'
    },
    {
      name: 'مریم احمدی',
      avatar: './images/pexels-photo-1239291.jpeg',
      role: 'طراح UI/UX',
      points: 1890,
      badge: 'Pro'
    },
    {
      name: 'علی پورمحمد',
      avatar: './images/pexels-photo-1043474.jpeg',
      role: 'توسعه‌دهنده Backend',
      points: 1650,
      badge: 'Advanced'
    }
  ];

  const events = [
    {
      id: '1',
      title: 'وبینار: آینده React در ۲۰۲۴',
      date: '۱۴۰۳/۰۹/۱۵',
      time: '۱۹:۰۰',
      attendees: 234,
      type: 'webinar'
    },
    {
      id: '2',
      title: 'چالش کدنویسی هفتگی',
      date: '۱۴۰۳/۰۹/۱۰',
      time: '۱۰:۰۰',
      attendees: 89,
      type: 'challenge'
    },
    {
      id: '3',
      title: 'جلسه Q&A با مدرسان',
      date: '۱۴۰۳/۰۹/۲۰',
      time: '۲۰:۰۰',
      attendees: 156,
      type: 'qa'
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">انجمن یادینو</h1>
        <p className="text-xl text-gray-400">
          محلی برای تبادل تجربه، یادگیری و رشد همراه با هزاران دانشجو
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass rounded-xl p-6 text-center">
          <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">۱۲,۵۰۰+</div>
          <div className="text-gray-400 text-sm">عضو فعال</div>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">۸,۹۰۰+</div>
          <div className="text-gray-400 text-sm">بحث و گفتگو</div>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">۱,۲۰۰+</div>
          <div className="text-gray-400 text-sm">پاسخ مفید</div>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">۹۵٪</div>
          <div className="text-gray-400 text-sm">رضایت اعضا</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          {/* Tabs */}
          <div className="glass rounded-xl overflow-hidden mb-6">
            <div className="border-b border-white/10">
              <nav className="flex flex-col sm:flex-row">
                {[
                  { id: 'discussions', name: 'بحث و گفتگو', icon: MessageCircle },
                  { id: 'events', name: 'رویدادها', icon: Calendar }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center sm:justify-start space-x-2 space-x-reverse px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors w-full sm:w-auto text-sm sm:text-base border-b sm:border-b-0 sm:border-r border-white/10 ${
                      activeTab === tab.id
                        ? 'text-purple-400 bg-purple-400/10 sm:bg-transparent sm:border-purple-400'
                        : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'discussions' && (
              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="جستجو در بحث‌ها..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
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
                    <button className="glow-button px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 space-x-reverse">
                      <Plus className="h-5 w-5" />
                      <span>بحث جدید</span>
                    </button>
                  </div>
                </div>

                {/* Discussions List */}
                <div className="space-y-4">
                  {filteredDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-white/5 rounded-lg p-4 sm:p-6 hover:bg-white/10 transition-colors">
                      <div className="flex items-start space-x-3 sm:space-x-4 space-x-reverse">
                        <img
                          src={discussion.avatar}
                          alt={discussion.author}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                            <h3 className="text-base sm:text-lg font-semibold line-clamp-2 hover:text-purple-400 cursor-pointer mb-1 sm:mb-0">
                              {discussion.title}
                            </h3>
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              {discussion.timeAgo}
                            </span>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {discussion.excerpt}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 space-x-reverse text-xs sm:text-sm text-gray-400">
                              <span>توسط {discussion.author}</span>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{discussion.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{discussion.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <span>👁</span>
                                <span>{discussion.views}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {discussion.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="p-6">
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.type === 'webinar' ? 'bg-blue-500/20 text-blue-400' :
                          event.type === 'challenge' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {event.type === 'webinar' ? 'وبینار' :
                           event.type === 'challenge' ? 'چالش' : 'Q&A'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <span>🕐</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} شرکت‌کننده</span>
                        </div>
                      </div>
                      
                      <button className="glow-button px-4 py-2 rounded-lg text-sm font-medium">
                        شرکت در رویداد
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
          {/* Top Members */}
          <div className="glass rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">اعضای برتر</h3>
            <div className="space-y-4">
              {topMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{member.name}</div>
                    <div className="text-gray-400 text-xs">{member.role}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold text-sm">{member.points}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      member.badge === 'Expert' ? 'bg-yellow-500/20 text-yellow-400' :
                      member.badge === 'Pro' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {member.badge}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="glass rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">قوانین انجمن</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• احترام به سایر اعضا</li>
              <li>• عدم ارسال محتوای نامناسب</li>
              <li>• استفاده از زبان مودبانه</li>
              <li>• عدم تبلیغات غیرمجاز</li>
              <li>• کمک به یکدیگر</li>
            </ul>
          </div>

          {/* Join Community */}
          <div className="glass rounded-xl p-4 sm:p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">عضو انجمن شوید</h3>
            <p className="text-gray-400 text-sm mb-4">
              با عضویت در انجمن، از تجربیات دیگران بهره‌مند شوید
            </p>
            <button className="w-full glow-button py-3 rounded-lg font-semibold">
              عضویت رایگان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
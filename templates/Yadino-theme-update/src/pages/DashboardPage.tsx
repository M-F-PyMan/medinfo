import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Play, Download, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <h1 className="text-3xl font-bold mb-4">لطفا ابتدا وارد شوید</h1>
        <Link to="/login" className="text-purple-400 hover:text-purple-300">
          صفحه ورود
        </Link>
      </div>
    );
  }

  const userCourses = [
    {
      id: '1',
      title: 'دوره کامل React و JavaScript مدرن',
      instructor: 'احمد رضایی',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      lastWatched: '۱۴۰۳/۰۸/۲۰',
      image: './images/pexels-photo-11035380.jpeg',
      duration: '۲۵ ساعت',
      certificateAvailable: false
    },
    {
      id: '3',
      title: 'دیجیتال مارکتینگ پیشرفته',
      instructor: 'محمد حسنی',
      progress: 100,
      totalLessons: 30,
      completedLessons: 30,
      lastWatched: '۱۴۰۳/۰۸/۱۵',
      image: './images/pexels-photo-265087.jpeg',
      duration: '۲۰ ساعت',
      certificateAvailable: true
    }
  ];

  const stats = [
    { icon: BookOpen, label: 'دوره‌های ثبت‌نامی', value: userCourses.length },
    { icon: Clock, label: 'ساعات آموزش', value: 45 },
    { icon: Award, label: 'گواهی‌های دریافتی', value: 1 },
    { icon: TrendingUp, label: 'میانگین پیشرفت', value: '87%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Welcome Section */}
      <div className="glass rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">سلام {user.name}! 👋</h1>
            <p className="text-gray-400">به داشبورد آموزشی خود خوش آمدید</p>
          </div>
          <div className="hidden md:block">
            <img
              src="./images/pexels-photo-1043471.jpeg"
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass rounded-xl p-6 text-center">
            <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/10">
          <nav className="flex flex-col sm:flex-row">
            {[
              { id: 'courses', name: 'دوره‌های من', icon: BookOpen },
              { id: 'certificates', name: 'گواهی‌ها', icon: Award },
              { id: 'progress', name: 'پیشرفت', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center sm:justify-start space-x-2 space-x-reverse px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 sm:border-b-2 border-purple-400 bg-purple-400/5 sm:bg-transparent'
                    : 'text-gray-400 hover:text-purple-400 hover:bg-white/5 sm:hover:bg-transparent'
                }`}
              >
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'courses' && (
            <div className="space-y-4 sm:space-y-6">
              {userCourses.map((course) => (
                <div key={course.id} className="bg-white/5 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-400 mb-3">مدرس: {course.instructor}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse mb-4">
                        <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          آخرین بازدید: {course.lastWatched}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">پیشرفت</span>
                          <span className="text-purple-400">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {course.completedLessons} از {course.totalLessons} درس تکمیل شده
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                        <Link
                          to={`/course/${course.id}`}
                          className="glow-button px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center sm:justify-start space-x-2 space-x-reverse"
                        >
                          <Play className="h-4 w-4" />
                          <span>ادامه یادگیری</span>
                        </Link>
                        
                        {course.certificateAvailable && (
                          <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center sm:justify-start space-x-2 space-x-reverse">
                            <Download className="h-4 w-4" />
                            <span>دانلود گواهی</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {userCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">هنوز دوره‌ای نخریده‌اید</h3>
                  <p className="text-gray-400 mb-6">از صدها دوره موجود یکی را انتخاب کنید</p>
                  <Link
                    to="/courses"
                    className="glow-button px-6 py-3 rounded-lg font-semibold"
                  >
                    مشاهده دوره‌ها
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-4 sm:space-y-6">
              {userCourses.filter(course => course.certificateAvailable).map((course) => (
                <div key={course.id} className="bg-white/5 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center self-center sm:self-auto">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-center sm:text-right">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-gray-400">تاریخ اتمام: {course.lastWatched}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-1 space-x-reverse mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-400">گواهی معتبر</span>
                        </div>
                      </div>
                    </div>
                    <button className="glow-button px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center sm:justify-start space-x-2 space-x-reverse">
                      <Download className="h-4 w-4" />
                      <span>دانلود</span>
                    </button>
                  </div>
                </div>
              ))}

              {userCourses.filter(course => course.certificateAvailable).length === 0 && (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">هنوز گواهی‌ای دریافت نکرده‌اید</h3>
                  <p className="text-gray-400">پس از اتمام موفقیت‌آمیز دوره‌ها، گواهی دریافت کنید</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 rounded-lg p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">۸۷%</div>
                  <div className="text-gray-400 text-sm sm:text-base">میانگین پیشرفت</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">۶۴</div>
                  <div className="text-gray-400 text-sm sm:text-base">درس تکمیل شده</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">پیشرفت هفتگی</h3>
                <div className="space-y-3">
                  {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, index) => (
                    <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                      <span className="text-gray-400 text-sm sm:text-base">{day}</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400">{Math.floor(Math.random() * 4)} ساعت</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gamification Link */}
      <div className="glass rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">🎯 مرکز موفقیت</h2>
            <p className="text-gray-400">دستاوردها، امتیازات و چالش‌های خود را ببینید</p>
          </div>
          <Link to="/gamification" className="glow-button px-6 py-3 rounded-lg font-semibold">
            مشاهده دستاوردها
          </Link>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">ادامه یادگیری</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Node.js پیشرفته', price: '۲۲۹,۰۰۰ تومان', image: './images/pexels-photo-11035471.jpeg' },
            { title: 'Vue.js کامل', price: '۱۸۹,۰۰۰ تومان', image: './images/pexels-photo-11035380.jpeg' },
            { title: 'طراحی موبایل', price: '۲۵۹,۰۰۰ تومان', image: './images/pexels-photo-196644.jpeg' }
          ].map((course, index) => (
            <div key={index} className="bg-white/5 rounded-lg overflow-hidden card-hover">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-semibold">{course.price}</span>
                  <button className="glow-button px-3 py-1 rounded text-sm">
                    مشاهده
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
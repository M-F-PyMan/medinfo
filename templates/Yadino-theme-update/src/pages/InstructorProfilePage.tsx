import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, BookOpen, Award, Calendar, MapPin, Globe, Mail, ArrowLeft, Send } from 'lucide-react';

function InstructorProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [reviews, setReviews] = useState([
    {
      id: '1',
      studentName: 'علی محمدی',
      rating: 5,
      date: '۱۴۰۳/۰۸/۱۰',
      comment: 'بهترین مدرسی که تاحالا ازش درس گرفتم. توضیحاتش خیلی واضح و عملی هست.',
      courseName: 'دوره کامل React'
    },
    {
      id: '2',
      studentName: 'مریم احمدی',
      rating: 5,
      date: '۱۴۰۳/۰۸/۰۵',
      comment: 'استاد احمد واقعا حرفه‌ای هست. پروژه‌هایی که توی دوره می‌سازیم خیلی کاربردی هستن.',
      courseName: 'TypeScript پیشرفته'
    },
    {
      id: '3',
      studentName: 'حسین کریمی',
      rating: 4,
      date: '۱۴۰۳/۰۷/۲۸',
      comment: 'دوره عالی بود. فقط کاش بیشتر روی پروژه‌های عملی تمرکز می‌کرد.',
      courseName: 'Node.js Backend'
    }
  ]);

  // Mock instructor data
  const instructor = {
    id: id || '1',
    name: 'احمد رضایی',
    title: 'متخصص React و JavaScript',
    bio: 'احمد رضایی با بیش از ۸ سال تجربه در توسعه نرم‌افزار، متخصص React و JavaScript است. او در شرکت‌های بزرگ تکنولوژی کار کرده و بیش از ۵۰ پروژه موفق را رهبری کرده است. تخصص او در Frontend Development، معماری نرم‌افزار و آموزش تکنولوژی‌های مدرن است.',
    image: './images/pexels-photo-1043471.jpeg',
    rating: 4.9,
    totalStudents: 3500,
    totalCourses: 12,
    experience: '۸ سال',
    location: 'تهران، ایران',
    joinDate: '۱۳۹۵',
    website: 'https://ahmadrezaei.dev',
    email: 'ahmad@example.com',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'GraphQL', 'MongoDB'],
    achievements: [
      'برنده جایزه بهترین مدرس سال ۱۴۰۲',
      'نویسنده کتاب "React پیشرفته"',
      'سخنران در کنفرانس‌های تکنولوژی',
      'مشاور فنی در ۱۰+ استارتاپ'
    ]
  };

  const courses = [
    {
      id: '1',
      title: 'دوره کامل React و JavaScript مدرن',
      students: 1250,
      rating: 4.9,
      price: 199000,
      image: './images/pexels-photo-11035380.jpeg',
      level: 'متوسط',
      duration: '۲۵ ساعت'
    },
    {
      id: '5',
      title: 'TypeScript برای توسعه‌دهندگان React',
      students: 890,
      rating: 4.8,
      price: 229000,
      image: './images/pexels-photo-11035471.jpeg',
      level: 'پیشرفته',
      duration: '۲۰ ساعت'
    },
    {
      id: '8',
      title: 'Node.js و Express برای Backend',
      students: 650,
      rating: 4.7,
      price: 259000,
      image: './images/pexels-photo-1181244.jpeg',
      level: 'متوسط',
      duration: '۳۰ ساعت'
    }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review = {
        id: Date.now().toString(),
        studentName: 'کاربر جدید',
        rating: newReview.rating,
        date: new Date().toLocaleDateString('fa-IR'),
        comment: newReview.comment,
        courseName: 'دوره جدید'
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-purple-400">خانه</Link>
        <span className="mx-2">/</span>
        <span className="text-white">پروفایل مدرس</span>
      </nav>

      {/* Instructor Header */}
      <div className="glass rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 lg:space-x-reverse">
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0"
          />
          
          <div className="flex-1 text-center lg:text-right">
            <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
            <p className="text-xl text-purple-400 mb-4">{instructor.title}</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{instructor.rating}</div>
                <div className="text-sm text-gray-400">امتیاز</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{instructor.totalStudents.toLocaleString('fa')}</div>
                <div className="text-sm text-gray-400">دانشجو</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{instructor.totalCourses}</div>
                <div className="text-sm text-gray-400">دوره</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{instructor.experience}</div>
                <div className="text-sm text-gray-400">تجربه</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <MapPin className="h-4 w-4" />
                <span>{instructor.location}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>عضو از {instructor.joinDate}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Globe className="h-4 w-4" />
                <a href={instructor.website} className="hover:text-purple-400">وب‌سایت شخصی</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/10">
          <nav className="flex flex-col md:flex-row">
            {[
              { id: 'about', name: 'درباره مدرس' },
              { id: 'skills', name: 'مهارت‌ها' },
              { id: 'certificates', name: 'گواهینامه‌ها' },
              { id: 'courses', name: 'دوره‌ها' },
              { id: 'social', name: 'شبکه‌های اجتماعی' },
              { id: 'reviews', name: 'نظرات دانشجویان' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-3 md:py-4 font-medium transition-colors text-sm md:text-base w-full md:w-auto text-center md:text-right border-b md:border-b-0 md:border-r border-white/10 ${
                  activeTab === tab.id
                    ? 'text-purple-400 bg-purple-400/10 md:bg-transparent md:border-purple-400'
                    : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Bio */}
              <div>
                <h3 className="text-xl font-semibold mb-4">درباره من</h3>
                <p className="text-gray-300 leading-relaxed">{instructor.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold mb-4">مهارت‌ها</h3>
                <div className="flex flex-wrap gap-3">
                  {instructor.skills.map((skill, index) => (
                    <span key={index} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold mb-4">دستاوردها</h3>
                <ul className="space-y-3">
                  {instructor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-3 space-x-reverse">
                      <Award className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-semibold mb-4">تماس</h3>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a href={`mailto:${instructor.email}`} className="text-purple-400 hover:text-purple-300">
                    {instructor.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
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
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
                    
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString('fa')} نفر</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-400">
                        {course.price.toLocaleString('fa')} تومان
                      </span>
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
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
               <div className="text-4xl font-bold text-purple-400 mb-2">{instructor.rating}</div>
                <div className="flex items-center justify-center space-x-1 space-x-reverse mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400">بر اساس نظر {instructor.totalStudents.toLocaleString('fa')} دانشجو</p>
              </div>

              {/* Add Review Form */}
              <div className="glass-light rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">نظر خود را بنویسید</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">امتیاز شما:</label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`h-6 w-6 ${
                              star <= newReview.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-400'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">نظر شما:</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      rows={4}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="نظر خود را در مورد این مدرس بنویسید..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="glow-button px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 space-x-reverse"
                  >
                    <Send className="h-4 w-4" />
                    <span>ارسال نظر</span>
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-white/10 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{review.studentName}</div>
                          <div className="text-sm text-gray-400">{review.courseName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 space-x-reverse mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">{review.date}</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">مهارت‌های تخصصی</h3>
              
              {/* نشان‌های تخصص */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">⚛️</div>
                  <div className="font-semibold">React</div>
                  <div className="text-xs opacity-80">پیشرفته</div>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🟨</div>
                  <div className="font-semibold">JavaScript</div>
                  <div className="text-xs opacity-80">متخصص</div>
                </div>
                <div className="bg-purple-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🔷</div>
                  <div className="font-semibold">TypeScript</div>
                  <div className="text-xs opacity-80">پیشرفته</div>
                </div>
                <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🟢</div>
                  <div className="font-semibold">Node.js</div>
                  <div className="text-xs opacity-80">متوسط</div>
                </div>
              </div>

              {/* زبان‌های تدریس */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-purple-400">زبان‌های تدریس:</h4>
                <div className="flex gap-2">
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium">فارسی</span>
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium">انگلیسی</span>
                </div>
              </div>

              {/* زمان پاسخگویی */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold text-green-400">پاسخگویی سریع</div>
                    <div className="text-sm text-gray-400">پاسخگویی در کمتر از ۲ ساعت</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">گواهینامه‌ها و جوایز</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">🏆</div>
                  <div className="font-bold text-lg mb-2">مدرس برتر ۱۴۰۲</div>
                  <div className="text-sm opacity-90">برترین مدرس سال در زمینه React و JavaScript</div>
                </div>
                <div className="bg-blue-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">📜</div>
                  <div className="font-bold text-lg mb-2">گواهی React</div>
                  <div className="text-sm opacity-90">گواهی رسمی React از Meta</div>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">🎓</div>
                  <div className="font-bold text-lg mb-2">کارشناسی ارشد</div>
                  <div className="text-sm opacity-90">مهندسی نرم‌افزار از دانشگاه تهران</div>
                </div>
                <div className="bg-purple-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">⭐</div>
                  <div className="font-bold text-lg mb-2">۸ سال تجربه</div>
                  <div className="text-sm opacity-90">توسعه نرم‌افزار و تدریس</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">شبکه‌های اجتماعی</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg text-center transition-colors">
                  <svg className="w-8 h-8 text-white mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div className="font-semibold text-white">LinkedIn</div>
                  <div className="text-xs text-blue-200">پروفایل حرفه‌ای</div>
                </a>
                
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg text-center transition-colors">
                  <svg className="w-8 h-8 text-white mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div className="font-semibold text-white">GitHub</div>
                  <div className="text-xs text-gray-300">پروژه‌های کد</div>
                </a>
                
                <a href="#" className="bg-blue-400 hover:bg-blue-500 p-6 rounded-lg text-center transition-colors">
                  <svg className="w-8 h-8 text-white mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <div className="font-semibold text-white">Twitter</div>
                  <div className="text-xs text-blue-200">به‌روزرسانی‌ها</div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Link
          to="/"
          className="text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center space-x-2 space-x-reverse"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
}

export default InstructorProfilePage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, Target, Zap, Award, Crown, Calendar, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function GamificationPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('achievements');

  // Mock data for gamification
  const userStats = {
    level: 8,
    experience: 2450,
    nextLevelExp: 3000,
    totalPoints: 12500,
    streak: 12,
    achievements: 15,
    rank: 'طلایی',
    rankPosition: 3
  };

  const achievements = [
    {
      id: 1,
      title: 'یادگیرنده تازه‌کار',
      description: 'اولین دوره خود را تکمیل کنید',
      icon: Star,
      progress: 100,
      completed: true,
      points: 100,
      reward: 'Badge طلایی'
    },
    {
      id: 2,
      title: 'مطالعه‌گر سخت‌کوش',
      description: '۷ روز متوالی مطالعه کنید',
      icon: Calendar,
      progress: 85,
      completed: false,
      points: 200,
      reward: '۵۰ امتیاز اضافی'
    },
    {
      id: 3,
      title: 'سرعت‌یاب',
      description: 'یک دوره را در کمتر از ۲ هفته تکمیل کنید',
      icon: Zap,
      progress: 60,
      completed: false,
      points: 300,
      reward: 'Badge سرعت'
    },
    {
      id: 4,
      title: 'اجتماعی‌گرا',
      description: 'در ۱۰ بحث انجمن مشارکت کنید',
      icon: Users,
      progress: 40,
      completed: false,
      points: 150,
      reward: 'Badge اجتماعی'
    },
    {
      id: 5,
      title: 'مدرس آینده',
      description: 'به ۵ سوال دیگران پاسخ دهید',
      icon: BookOpen,
      progress: 80,
      completed: false,
      points: 250,
      reward: 'Badge مدرس'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'علی محمدی', points: 18500, level: 12, avatar: './images/pexels-photo-1043471.jpeg' },
    { rank: 2, name: 'سارا احمدی', points: 17200, level: 11, avatar: './images/pexels-photo-196644.jpeg' },
    { rank: 3, name: user?.name || 'شما', points: 12500, level: 8, avatar: './images/pexels-photo-1043471.jpeg', isCurrentUser: true },
    { rank: 4, name: 'محمد رضایی', points: 11800, level: 9, avatar: './images/pexels-photo-265087.jpeg' },
    { rank: 5, name: 'فاطمه کریمی', points: 10200, level: 7, avatar: './images/pexels-photo-196644.jpeg' }
  ];

  const challenges = [
    {
      id: 1,
      title: 'چالش هفتگی: یادگیری عمیق',
      description: 'این هفته ۱۰ ساعت مطالعه کنید',
      progress: 7,
      target: 10,
      reward: '۲۰۰ امتیاز + Badge هفتگی',
      deadline: '۲ روز باقی‌مانده',
      icon: Target
    },
    {
      id: 2,
      title: 'چالش ماهانه: تکمیل دوره',
      description: 'یک دوره کامل را در این ماه تمام کنید',
      progress: 0,
      target: 1,
      reward: '۵۰۰ امتیاز + گواهی ویژه',
      deadline: '۱۵ روز باقی‌مانده',
      icon: Trophy
    }
  ];

  const calculateProgress = () => {
    return ((userStats.experience / userStats.nextLevelExp) * 100).toFixed(1);
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-right mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold mb-2">مرکز موفقیت {user.name}! 🎯</h1>
            <p className="text-gray-400">پیشرفت خود را دنبال کنید و جایزه بگیرید</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{userStats.level}</div>
              <div className="text-sm text-gray-400">سطح</div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="glass rounded-xl p-4 sm:p-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">{userStats.totalPoints}</div>
          <div className="text-gray-400 text-sm sm:text-base">امتیاز کل</div>
        </div>
        <div className="glass rounded-xl p-4 sm:p-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">{userStats.streak}</div>
          <div className="text-gray-400 text-sm sm:text-base">روز متوالی</div>
        </div>
        <div className="glass rounded-xl p-4 sm:p-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">{userStats.achievements}</div>
          <div className="text-gray-400 text-sm sm:text-base">دستاورد</div>
        </div>
        <div className="glass rounded-xl p-4 sm:p-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">#{userStats.rankPosition}</div>
          <div className="text-gray-400 text-sm sm:text-base">رتبه</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">پیشرفت به سطح بعدی</h3>
          <span className="text-purple-400 font-medium">{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-400">
          {userStats.experience} / {userStats.nextLevelExp} امتیاز تجربه
        </div>
      </div>

      {/* Tabs */}
      <div className="glass rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/10">
          <nav className="flex flex-col sm:flex-row">
            {[
              { id: 'achievements', name: 'دستاوردها', icon: Trophy },
              { id: 'leaderboard', name: 'جدول امتیازات', icon: Crown },
              { id: 'challenges', name: 'چالش‌ها', icon: Target }
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
          {activeTab === 'achievements' && (
            <div className="space-y-4 sm:space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-white/5 rounded-lg p-4 sm:p-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      achievement.completed 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                        : 'bg-gray-700'
                    }`}>
                      <achievement.icon className={`h-6 w-6 ${
                        achievement.completed ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                        <span className="text-purple-400 font-medium">{achievement.points} امتیاز</span>
                      </div>
                      <p className="text-gray-400 mb-3">{achievement.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">پیشرفت</span>
                          <span className="text-purple-400">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              achievement.completed 
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                                : 'bg-gradient-to-r from-purple-500 to-pink-500'
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">جایزه: {achievement.reward}</span>
                        {achievement.completed && (
                          <span className="text-green-400 text-sm font-medium">✓ تکمیل شده</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              {leaderboard.map((player, index) => (
                <div key={player.rank} className={`bg-white/5 rounded-lg p-4 sm:p-6 ${
                  player.isCurrentUser ? 'ring-2 ring-purple-400' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {player.rank}
                        </div>
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-gray-400">سطح {player.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-400">{player.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">امتیاز</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-4 sm:space-y-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white/5 rounded-lg p-4 sm:p-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <challenge.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                      <p className="text-gray-400 mb-3">{challenge.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">پیشرفت</span>
                          <span className="text-purple-400">{challenge.progress} / {challenge.target}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <span className="text-sm text-gray-400">{challenge.deadline}</span>
                          <span className="text-sm text-yellow-400 font-medium">{challenge.reward}</span>
                        </div>
                        <button className="glow-button px-4 py-2 rounded-lg text-sm font-medium">
                          مشاهده جزئیات
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Daily Streak */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">🔥 رکورد روزانه</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className={`aspect-square rounded-lg flex items-center justify-center ${
              i < userStats.streak % 7 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                : 'bg-gray-700'
            }`}>
              <span className="text-white font-bold">{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-4">
          {userStats.streak} روز متوالی مطالعه! 🎉
        </p>
      </div>
    </div>
  );
}

export default GamificationPage;

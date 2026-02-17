import React, { useState } from 'react';
import { Camera, Save, User, Mail, Phone, MapPin, Calendar, Bell, Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    birthDate: '',
    website: '',
    github: '',
    linkedin: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <h1 className="text-3xl font-bold mb-4">لطفا ابتدا وارد شوید</h1>
        <a href="/login" className="text-purple-400 hover:text-purple-300">
          صفحه ورود
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      <h1 className="text-3xl font-bold mb-8">تنظیمات پروفایل</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl overflow-hidden sticky top-24">
            {/* Profile Image */}
            <div className="p-6 text-center border-b border-white/10">
              <div className="relative inline-block">
                <img
                  src={user.avatar || './images/pexels-photo-1043471.jpeg'}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              <h3 className="text-lg font-semibold mt-3">{user.name}</h3>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="p-2">
              {[
                { id: 'profile', name: 'اطلاعات پروفایل', icon: User },
                { id: 'notifications', name: 'اعلان‌ها', icon: Bell },
                { id: 'security', name: 'امنیت', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-right transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="glass rounded-xl p-8">
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">اطلاعات پروفایل</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="glow-button px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {isEditing ? 'لغو' : 'ویرایش'}
                  </button>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                        className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">ایمیل</label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">شماره تماس</label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">تاریخ تولد</label>
                      <div className="relative">
                        <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                          disabled={!isEditing}
                          className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">درباره من</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 resize-none"
                      placeholder="چند جمله درباره خودتان بنویسید..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">محل سکونت</label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          disabled={!isEditing}
                          className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                          placeholder="تهران، ایران"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">وب‌سایت</label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        disabled={!isEditing}
                        className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="glow-button px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 space-x-reverse"
                      >
                        <Save className="h-5 w-5" />
                        <span>ذخیره تغییرات</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">تنظیمات اعلان‌ها</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg ">
                    <div>
                      <h3 className="font-semibold mb-1">اعلان‌های ایمیل</h3>
                      <p className="text-gray-400 text-sm">دریافت اعلان‌ها از طریق ایمیل</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.email ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.email ? 'translate-x-0' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="font-semibold mb-1">اعلان‌های پیامکی</h3>
                      <p className="text-gray-400 text-sm">دریافت اعلان‌ها از طریق پیامک</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('sms')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.sms ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.sms ? 'translate-x-0' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="font-semibold mb-1">اعلان‌های مرورگر</h3>
                      <p className="text-gray-400 text-sm">دریافت اعلان‌های فوری در مرورگر</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('push')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.push ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.push ? 'translate-x-0' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="font-semibold mb-1">اعلان‌های بازاریابی</h3>
                      <p className="text-gray-400 text-sm">دریافت پیشنهادات و تخفیف‌های ویژه</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('marketing')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.marketing ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.marketing ? 'translate-x-0' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="glow-button px-6 py-3 rounded-lg font-semibold">
                    ذخیره تنظیمات
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">امنیت حساب</h2>
                
                {/* Change Password */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">تغییر رمز عبور</h3>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">رمز عبور فعلی</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="w-full py-3 px-4 pr-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="رمز عبور فعلی"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">رمز عبور جدید</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="حداقل ۸ کاراکتر"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">تکرار رمز عبور جدید</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="رمز عبور جدید را دوباره وارد کنید"
                      />
                    </div>

                    <button
                      type="submit"
                      className="glow-button px-6 py-3 rounded-lg font-semibold"
                    >
                      تغییر رمز عبور
                    </button>
                  </form>
                </div>

                {/* Two Factor Authentication */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-lg font-semibold mb-4">احراز هویت دو مرحله‌ای</h3>
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 mb-4">
                      برای افزایش امنیت حساب خود، احراز هویت دو مرحله‌ای را فعال کنید.
                    </p>
                    <button className="glow-button px-4 py-2 rounded-lg text-sm font-medium">
                      فعال‌سازی
                    </button>
                  </div>
                </div>

                {/* Login History */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-lg font-semibold mb-4">تاریخچه ورود</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome - Windows', location: 'تهران، ایران', time: '۲ ساعت پیش', current: true },
                      { device: 'Safari - iPhone', location: 'تهران، ایران', time: '۱ روز پیش', current: false },
                      { device: 'Firefox - Windows', location: 'تهران، ایران', time: '۳ روز پیش', current: false }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-gray-400">{session.location} • {session.time}</div>
                        </div>
                        {session.current ? (
                          <span className="bg-green-500 px-2 py-1 rounded-full text-xs">فعلی</span>
                        ) : (
                          <button className="text-red-400 hover:text-red-300 text-sm">
                            خروج
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
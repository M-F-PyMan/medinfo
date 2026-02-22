import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Download,
}
from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://127.0.0.1:8000/api";

function DashboardPage() {
  const { user, role, loading } = useAuth();

  const [courses, setCourses] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [homeData, setHomeData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("courses");

  // -----------------------------
  // Redirect if instructor
  // -----------------------------
  if (role === "instructor") {
    window.location.href = "/instructor/dashboard";
    return null;
  }

  // -----------------------------
  // Fetch user courses
  // -----------------------------
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/me/courses/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  // -----------------------------
  // Fetch certificates
  // -----------------------------
  const fetchCertificates = async () => {
    try {
      const res = await fetch(`${API_BASE}/certificates/my_certificates/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch (err) {
      console.error("Error loading certificates:", err);
    }
  };

  // -----------------------------
  // Fetch home data (continue learning)
  // -----------------------------
  const fetchHome = async () => {
    try {
      const res = await fetch(`${API_BASE}/home/`);
      if (res.ok) {
        const data = await res.json();
        setHomeData(data);
      }
    } catch (err) {
      console.error("Error loading home:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCourses();
      fetchCertificates();
      fetchHome();
    }
  }, [user]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-400">در حال بارگذاری...</div>
    );

  if (!user)
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 rtl text-center">
        <h1 className="text-3xl font-bold mb-4">لطفا ابتدا وارد شوید</h1>
        <Link to="/login" className="text-purple-400 hover:text-purple-300">
          صفحه ورود
        </Link>
      </div>
    );

  // -----------------------------
  // Stats
  // -----------------------------
  const stats = [
    { icon: BookOpen, label: "دوره‌های ثبت‌نامی", value: courses.length },
    { icon: Clock, label: "ساعات آموزش", value: 0 },
    { icon: Award, label: "گواهی‌های دریافتی", value: certificates.length },
    { icon: TrendingUp, label: "میانگین پیشرفت", value: "—" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 rtl">
      {/* Welcome */}
      <div className="glass rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">سلام {user.name}! 👋</h1>
        <p className="text-gray-400">به داشبورد آموزشی خود خوش آمدید</p>
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
              { id: "courses", name: "دوره‌های من", icon: BookOpen },
              { id: "certificates", name: "گواهی‌ها", icon: Award },
              { id: "progress", name: "پیشرفت", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center sm:justify-start space-x-2 space-x-reverse px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-purple-400"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* COURSES */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-3">
                    مدرس: {course.teacher_name}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">پیشرفت</span>
                      <span className="text-purple-400">
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link
                    to={`/course/${course.slug}`}
                    className="glow-button px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    ادامه یادگیری
                  </Link>
                </div>
              ))}

              {courses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    هنوز دوره‌ای نخریده‌اید
                  </h3>
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

          {/* CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              {certificates.map((cert) => (
                <div key={cert.serial} className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {cert.course_title}
                  </h3>
                  <p className="text-gray-400 mb-3">
                    تاریخ صدور: {cert.issued_at.slice(0, 10)}
                  </p>

                  <a
                    href={cert.pdf_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    دانلود گواهی
                  </a>
                </div>
              ))}

              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    هنوز گواهی‌ای دریافت نکرده‌اید
                  </h3>
                </div>
              )}
            </div>
          )}

          {/* PROGRESS */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  —
                </div>
                <div className="text-gray-400">میانگین پیشرفت</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Learning */}
      {homeData && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">ادامه یادگیری</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeData.newest.slice(0, 3).map((course: any) => (
              <div
                key={course.id}
                className="bg-white/5 rounded-lg overflow-hidden card-hover"
              >
                <img
                  src={course.preview_image}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold">
                      {course.price} تومان
                    </span>
                    <Link
                      to={`/course/${course.slug}`}
                      className="glow-button px-3 py-1 rounded text-sm"
                    >
                      مشاهده
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

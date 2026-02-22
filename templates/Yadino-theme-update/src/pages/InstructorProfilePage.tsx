import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Users,
  Calendar,
  MapPin,
  Globe,
  Mail,
  ArrowLeft,
  Send,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://127.0.0.1:8000/api";

interface InstructorProfile {
  id: number;
  name: string;
  username: string;
  date_joined: string;   // ← اینو اضافه کن
  profile?: {
    image?: string;
    bio?: string;
    specialty?: string;
    field?: string;
    phone?: string;
  };
  instructor_profile?: {
    degree?: string;
    experience?: number;
    linkedin?: string;
    website?: string;
  };
  students: number;
  courses: number;
  rating: number;
  reviews_count: number;
  instructor_reviews: InstructorReview[];
}


interface InstructorReview {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface CourseItem {
  id: number;
  title: string;
  students_count?: number;
  average_rating?: number;
  price: number;
  preview_image?: string;
  level?: string;
  duration?: string;
}

function InstructorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();

  const [instructor, setInstructor] = useState<InstructorProfile | null>(null);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "certificates" | "courses" | "social" | "reviews">("about");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<InstructorReview[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const instructorId = id || "";

  // -----------------------------
  // Fetch instructor + reviews + courses
  // -----------------------------
  useEffect(() => {
    if (!instructorId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1) Instructor public data
        const resInstructor = await fetch(`${API_BASE}/instructors/${instructorId}/`);
        if (!resInstructor.ok) {
          setLoading(false);
          return;
        }
        const instructorData = await resInstructor.json();
        setInstructor(instructorData);
        setReviews(instructorData.instructor_reviews || []);

        // 2) Instructor courses (simple filter by teacher id – backend باید ساپورت کنه)
        const resCourses = await fetch(`${API_BASE}/courses?teacher=${instructorId}`);
        if (resCourses.ok) {
          const coursesData = await resCourses.json();
          setCourses(
            coursesData.map((c: any) => ({
              id: c.id,
              title: c.title,
              students_count: c.students_count ?? undefined,
              average_rating: c.average_rating ?? undefined,
              price: c.price,
              preview_image: c.preview_image,
              level: c.level,
              duration: c.duration,
            }))
          );
        }
      } catch (e) {
        console.error("Error loading instructor profile:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [instructorId]);

  // -----------------------------
  // Submit review
  // -----------------------------
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorId || !newReview.comment.trim() || !isAuthenticated) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/instructor-reviews/${instructorId}/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
        },
        body: JSON.stringify({
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (!res.ok) {
        console.error("Failed to submit review");
        setSubmitting(false);
        return;
      }

      const data: InstructorReview = await res.json();
      setReviews((prev) => [data, ...prev]);
      setNewReview({ rating: 5, comment: "" });

      // آپدیت میانگین امتیاز به صورت ساده (اختیاری)
      if (instructor) {
        const total = reviews.reduce((sum, r) => sum + r.rating, 0) + data.rating;
        const count = reviews.length + 1;
        setInstructor({
          ...instructor,
          rating: Math.round((total / count) * 10) / 10,
          reviews_count: count,
        });
      }
    } catch (e) {
      console.error("Error submitting review:", e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <p className="text-gray-300">در حال بارگذاری پروفایل مدرس...</p>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <p className="text-gray-300">مدرس مورد نظر یافت نشد.</p>
        <Link to="/" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const profileImage =
    instructor.profile?.image || "./images/pexels-photo-1043471.jpeg";
  const bio =
    instructor.profile?.bio ||
    "اطلاعات بیوگرافی برای این مدرس هنوز ثبت نشده است.";

  const website =
    instructor.instructor_profile?.website || "https://example.com";
  const experienceYears =
    instructor.instructor_profile?.experience != null
      ? `${instructor.instructor_profile.experience} سال`
      : "نامشخص";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-purple-400">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">پروفایل مدرس</span>
      </nav>

      {/* Instructor Header */}
      <div className="glass rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 lg:space-x-reverse">
          <img
            src={profileImage}
            alt={instructor.name}
            className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0"
          />

          <div className="flex-1 text-center lg:text-right">
            <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
            <p className="text-xl text-purple-400 mb-4">
              {instructor.profile?.specialty || "مدرس دوره‌های تخصصی"}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {instructor.rating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-400">امتیاز</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {instructor.students.toLocaleString("fa")}
                </div>
                <div className="text-sm text-gray-400">دانشجو</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {instructor.courses}
                </div>
                <div className="text-sm text-gray-400">دوره</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {experienceYears}
                </div>
                <div className="text-sm text-gray-400">تجربه</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <MapPin className="h-4 w-4" />
                <span>{instructor.profile?.field || "محل فعالیت نامشخص"}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>عضو از {new Date(instructor.date_joined || "").getFullYear() || "نامشخص"}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Globe className="h-4 w-4" />
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-400"
                >
                  وب‌سایت شخصی
                </a>
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
              { id: "about", name: "درباره مدرس" },
              { id: "skills", name: "مهارت‌ها" },
              { id: "certificates", name: "گواهینامه‌ها" },
              { id: "courses", name: "دوره‌ها" },
              { id: "social", name: "شبکه‌های اجتماعی" },
              { id: "reviews", name: "نظرات دانشجویان" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 md:px-6 py-3 md:py-4 font-medium transition-colors text-sm md:text-base w-full md:w-auto text-center md:text-right border-b md:border-b-0 md:border-r border-white/10 ${
                  activeTab === tab.id
                    ? "text-purple-400 bg-purple-400/10 md:bg-transparent md:border-purple-400"
                    : "text-gray-400 hover:text-purple-400 hover:bg-white/5"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* ABOUT */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">درباره من</h3>
                <p className="text-gray-300 leading-relaxed">{bio}</p>
              </div>

              {instructor.profile?.specialty && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">تخصص‌ها</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                      {instructor.profile.specialty}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-4">تماس</h3>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-purple-400">
                    {instructor.username}@example.com
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* COURSES */}
          {activeTab === "courses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="glass rounded-xl overflow-hidden card-hover"
                >
                  <div className="relative">
                    <img
                      src={
                        course.preview_image ||
                        "./images/pexels-photo-11035380.jpeg"
                      }
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {course.level && (
                      <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                        {course.level}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.average_rating ?? instructor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>
                          {(course.students_count || 0).toLocaleString("fa")} نفر
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-400">
                        {course.price.toLocaleString("fa")} تومان
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

              {courses.length === 0 && (
                <div className="col-span-full text-center text-gray-400">
                  هنوز دوره‌ای برای این مدرس ثبت نشده است.
                </div>
              )}
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {instructor.rating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center space-x-1 space-x-reverse mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(instructor.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400">
                  بر اساس نظر {instructor.reviews_count.toLocaleString("fa")}{" "}
                  دانشجو
                </p>
              </div>

              {/* Add Review Form */}
              <div className="glass-light rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">نظر خود را بنویسید</h3>

                {!isAuthenticated && (
                  <p className="text-sm text-red-400 mb-4">
                    برای ثبت نظر باید وارد حساب کاربری شوید.
                  </p>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      امتیاز شما:
                    </label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setNewReview({ ...newReview, rating: star })
                          }
                          className="focus:outline-none"
                          disabled={!isAuthenticated}
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= newReview.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      نظر شما:
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          comment: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="نظر خود را در مورد این مدرس بنویسید..."
                      required
                      disabled={!isAuthenticated || submitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isAuthenticated || submitting}
                    className="glow-button px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 space-x-reverse disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? "در حال ارسال..." : "ارسال نظر"}</span>
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{review.user_name}</div>
                          <div className="text-sm text-gray-400">
                            دانشجو
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 space-x-reverse mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(review.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center text-gray-400">
                    هنوز نظری برای این مدرس ثبت نشده است.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                مهارت‌های تخصصی
              </h3>

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

              <div>
                <h4 className="text-md font-semibold mb-3 text-purple-400">
                  زبان‌های تدریس:
                </h4>
                <div className="flex gap-2">
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    فارسی
                  </span>
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    انگلیسی
                  </span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold text-green-400">
                      پاسخگویی سریع
                    </div>
                    <div className="text-sm text-gray-400">
                      پاسخگویی در کمتر از ۲ ساعت
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                گواهینامه‌ها و جوایز
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">🏆</div>
                  <div className="font-bold text-lg mb-2">مدرس برتر</div>
                  <div className="text-sm opacity-90">
                    برترین مدرس در حوزه تخصصی خود
                  </div>
                </div>
                <div className="bg-blue-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">📜</div>
                  <div className="font-bold text-lg mb-2">گواهی تخصصی</div>
                  <div className="text-sm opacity-90">
                    گواهی رسمی از مراجع معتبر
                  </div>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">🎓</div>
                  <div className="font-bold text-lg mb-2">مدرک دانشگاهی</div>
                  <div className="text-sm opacity-90">
                    تحصیلات مرتبط با حوزه تدریس
                  </div>
                </div>
                <div className="bg-purple-500 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-3">⭐</div>
                  <div className="font-bold text-lg mb-2">
                    {experienceYears} تجربه
                  </div>
                  <div className="text-sm opacity-90">
                    تجربه عملی در پروژه‌ها و تدریس
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOCIAL */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                شبکه‌های اجتماعی
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={instructor.instructor_profile?.linkedin || "#"}
                  className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg text-center transition-colors"
                >
                  <div className="w-8 h-8 text-white mx-auto mb-3">in</div>
                  <div className="font-semibold text-white">LinkedIn</div>
                  <div className="text-xs text-blue-200">پروفایل حرفه‌ای</div>
                </a>

                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg text-center transition-colors"
                >
                  <div className="w-8 h-8 text-white mx-auto mb-3">{"</>"}</div>
                  <div className="font-semibold text-white">GitHub</div>
                  <div className="text-xs text-gray-300">پروژه‌های کد</div>
                </a>

                <a
                  href="#"
                  className="bg-blue-400 hover:bg-blue-500 p-6 rounded-lg text-center transition-colors"
                >
                  <div className="w-8 h-8 text-white mx-auto mb-3">𝕏</div>
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

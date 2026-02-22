// src/pages/CourseDetailsPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Users,
  Clock,
  Play,
  Download,
  Share2,
  Heart,
  CheckCircle,
  BookOpen,
  Award,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://127.0.0.1:8000/api";

interface Lesson {
  title: string;
  duration: string;
  preview: boolean;
}

interface CurriculumSection {
  title: string;
  lessons: Lesson[];
}

interface TeacherProfile {
  image?: string;
  bio?: string;
  specialty?: string;
}

interface Teacher {
  id: number;
  name: string;
  rating?: number;
  students?: number;
  courses?: number;
  profile?: TeacherProfile;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  price: number;
  original_price?: number;
  level?: string;
  language?: string;
  duration?: string;
  lessons_count?: number;
  last_updated?: string;
  rating?: number;
  students_count?: number;
  highlights?: string[];
  curriculum?: CurriculumSection[];
  teacher?: Teacher;
}

interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface RelatedCourse {
  id: number;
  title: string;
  price: number;
  original_price?: number;
  image?: string;
  rating?: number;
  students_count?: number;
  teacher_name?: string;
}

function ReviewForm({
  courseId,
  onSubmitted,
}: {
  courseId: number;
  onSubmitted: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0 || text.trim().length === 0) return;

    try {
      setSubmitting(true);
      await fetch(`${API_BASE}/course-reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
        },
        body: JSON.stringify({
          course: courseId,
          rating,
          comment: text.trim(),
        }),
      });

      setSubmitted(true);
      setText("");
      setRating(0);
      onSubmitted();
      setTimeout(() => setSubmitted(false), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mb-6">
      <div className="mb-4 text-right">
        <label className="block mb-2 text-lg font-semibold text-white">
          امتیاز شما:
        </label>
        <div className="flex flex-row-reverse justify-end gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none"
              tabIndex={-1}
            >
              <Star
                className={`h-7 w-7 transition-all ${
                  (hover || rating) >= star
                    ? "fill-yellow-400 text-yellow-400 scale-110"
                    : "fill-white/10 text-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-white">
          نظر شما:
        </label>
        <textarea
          className="w-full rounded-lg p-3 bg-white/10 text-white border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none resize-none min-h-[80px]"
          placeholder="نظر خود را بنویسید..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
        />
      </div>
      <button
        type="submit"
        className="glow-button px-8 py-3 rounded-lg font-semibold text-white text-lg mt-2 disabled:opacity-50"
        disabled={submitting || rating === 0 || text.trim().length === 0}
      >
        {submitting ? "در حال ارسال..." : "ارسال نظر"}
      </button>
      {submitted && (
        <div className="text-green-400 mt-4 text-center">
          نظر شما با موفقیت ثبت شد!
        </div>
      )}
    </form>
  );
}

function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedCourses, setRelatedCourses] = useState<RelatedCourse[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");
  const [loading, setLoading] = useState(true);

  const courseId = Number(id);

  const fetchCourse = async () => {
    const res = await fetch(`${API_BASE}/courses/${courseId}/`);
    if (res.ok) {
      const data = await res.json();
      setCourse(data);
    }
  };

  const fetchReviews = async () => {
    const res = await fetch(`${API_BASE}/course-reviews/?course=${courseId}`);
    if (res.ok) {
      const data = await res.json();
      setReviews(data);
    }
  };

  const fetchRelated = async () => {
    const res = await fetch(`${API_BASE}/courses/${courseId}/related/`);
    if (res.ok) {
      const data = await res.json();
      setRelatedCourses(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCourse(), fetchReviews(), fetchRelated()]).finally(() =>
      setLoading(false)
    );
  }, [courseId]);

  if (loading || !course) {
    return (
      <div className="text-center py-20 text-gray-400">
        در حال بارگذاری اطلاعات دوره...
      </div>
    );
  }

  const price = course.price;
  const originalPrice = course.original_price || price;
  const students = course.students_count || 0;
  const rating = course.rating || 0;
  const lessonsCount = course.lessons_count || 0;
  const highlights = course.highlights || [];
  const curriculum = course.curriculum || [];
  const teacher = course.teacher;

  const isPurchased =
    !!user &&
    Array.isArray((user as any).purchasedCourses) &&
    (user as any).purchasedCourses.includes(courseId);

  const handleAddToCart = () => {
    addToCart(course.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Header */}
          <div className="mb-8">
            <nav className="text-sm text-gray-400 mb-4">
              <Link to="/" className="hover:text-purple-400">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <Link to="/courses" className="hover:text-purple-400">
                دوره‌ها
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{course.title}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-gray-400 mb-6">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-gray-400">
                  ({students.toLocaleString("fa")} نظر)
                </span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                <Users className="h-4 w-4" />
                <span>{students.toLocaleString("fa")} دانشجو</span>
              </div>
              {course.duration && (
                <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.level && (
                <span className="bg-purple-500 px-3 py-1 rounded-full text-xs font-medium">
                  {course.level}
                </span>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-400">
              مدرس:{" "}
              {teacher ? (
                <Link
                  to={`/instructor/${teacher.id}`}
                  className="text-white font-medium hover:text-purple-400"
                >
                  {teacher.name}
                </Link>
              ) : (
                "نامشخص"
              )}{" "}
              {course.last_updated && (
                <>
                  | آخرین به‌روزرسانی: {course.last_updated}
                </>
              )}
            </div>
          </div>

          {/* Discount Timer (UI ثابت، نه موک دیتا) */}
          <div className="glass rounded-xl p-4 md:p-6 mb-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-red-400">
                ⏰ تخفیف ویژه
              </h3>
              <p className="text-sm text-gray-400 mb-4">فقط تا پایان امروز</p>
              <div className="flex justify-center space-x-2 space-x-reverse">
                <div className="bg-red-500 text-white px-3 py-2 rounded-lg">
                  <div className="text-xl font-bold">۰۲</div>
                  <div className="text-xs">ساعت</div>
                </div>
                <div className="bg-red-500 text-white px-3 py-2 rounded-lg">
                  <div className="text-xl font-bold">۴۵</div>
                  <div className="text-xs">دقیقه</div>
                </div>
                <div className="bg-red-500 text-white px-3 py-2 rounded-lg">
                  <div className="text-xl font-bold">۳۲</div>
                  <div className="text-xs">ثانیه</div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="glass rounded-xl overflow-hidden mb-8">
            <div className="relative">
              <img
                src={course.image || "./images/pexels-photo-11035380.jpeg"}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 transition-colors group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-white mr-1" />
                </div>
              </button>
              <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                پیش‌نمایش
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="border-b border-white/10">
              <nav className="flex">
                {[
                  { id: "overview", name: "نمای کلی" },
                  { id: "curriculum", name: "سرفصل‌ها" },
                  { id: "instructor", name: "مدرس" },
                  { id: "reviews", name: "نظرات" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(tab.id as typeof activeTab)
                    }
                    className={`px-4 md:px-6 py-3 md:py-4 font-medium transition-colors text-sm md:text-base ${
                      activeTab === tab.id
                        ? "text-purple-400 border-b-2 border-purple-400"
                        : "text-gray-400 hover:text-purple-400"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 md:p-6">
              {/* Overview */}
              {activeTab === "overview" && (
                <div className="space-y-4 md:space-y-6">
                  {highlights.length > 0 && (
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                        در این دوره یاد می‌گیرید:
                      </h3>
                      <ul className="space-y-2 md:space-y-3">
                        {highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2 md:space-x-3 space-x-reverse"
                          >
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm md:text-base">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                      اطلاعات کلی دوره:
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                      <li>• تعداد درس‌ها: {lessonsCount} درس</li>
                      {course.language && (
                        <li>• زبان دوره: {course.language}</li>
                      )}
                      {course.duration && (
                        <li>• مدت زمان تقریبی: {course.duration}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Curriculum */}
              {activeTab === "curriculum" && (
                <div className="space-y-4 md:space-y-6">
                  {curriculum.length === 0 && (
                    <div className="text-gray-400 text-sm">
                      سرفصل‌های این دوره هنوز ثبت نشده است.
                    </div>
                  )}

                  {curriculum.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="border border-white/10 rounded-lg"
                    >
                      <div className="bg-white/5 px-3 md:px-4 py-2 md:py-3 font-semibold text-sm md:text-base">
                        {section.title}
                      </div>
                      <div className="divide-y divide-white/10">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="px-3 md:px-4 py-2 md:py-3 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse flex-1">
                              <Play className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm md:text-base">
                                {lesson.title}
                              </span>
                              {lesson.preview && (
                                <span className="bg-yellow-500 px-1 md:px-2 py-1 rounded text-xs">
                                  پیش‌نمایش رایگان
                                </span>
                              )}
                            </div>
                            <span className="text-gray-400 text-xs md:text-sm mr-2">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor */}
              {activeTab === "instructor" && teacher && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto sm:mx-0 sm:ml-4 flex-shrink-0">
                      <img
                        src={
                          teacher.profile?.image ||
                          "./images/pexels-photo-1043471.jpeg"
                        }
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-right">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {teacher.name}
                      </h3>
                      <p className="text-purple-400 mb-3 text-sm md:text-base">
                        {teacher.profile?.specialty ||
                          "مدرس دوره‌های تخصصی"}
                      </p>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {teacher.profile?.bio ||
                          "اطلاعات بیوگرافی برای این مدرس ثبت نشده است."}
                      </p>
                      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 space-x-reverse text-xs md:text-sm text-gray-400">
                        {teacher.rating !== undefined && (
                          <span>⭐ {teacher.rating.toFixed(1)} امتیاز مدرس</span>
                        )}
                        {teacher.students !== undefined && (
                          <span>
                            <span className="mr-2">👥</span>
                            {teacher.students.toLocaleString("fa")} دانشجو
                          </span>
                        )}
                        {teacher.courses !== undefined && (
                          <span>📚 {teacher.courses} دوره</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* لینک به پروفایل کامل */}
                  <div className="text-center">
                    <Link
                      to={`/instructor/${teacher.id}`}
                      className="glow-button px-6 py-3 rounded-lg font-semibold inline-block"
                    >
                      مشاهده پروفایل کامل مدرس
                    </Link>
                  </div>
                </div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      {rating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center space-x-1 space-x-reverse mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-400">
                      {students.toLocaleString("fa")} نظر
                    </p>
                  </div>

                  {/* Review Form */}
                  <div className="mb-8">
                    {user ? (
                      <ReviewForm
                        courseId={course.id}
                        onSubmitted={fetchReviews}
                      />
                    ) : (
                      <div className="glass rounded-xl p-6 text-center text-gray-300 mb-6">
                        برای ثبت نظر باید وارد حساب کاربری خود شوید.
                        <Link
                          to="/login"
                          className="text-purple-400 font-bold hover:underline mx-2"
                        >
                          ورود
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-white/10 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.user_name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {review.user_name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {review.created_at}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                    {reviews.length === 0 && (
                      <div className="text-gray-400 text-sm">
                        هنوز نظری برای این دوره ثبت نشده است.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6 sticky top-24 z-10">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                <span className="text-purple-400 font-bold text-3xl">
                  {price.toLocaleString("fa")} تومان
                </span>
              </div>
              {originalPrice > price && (
                <div className="text-gray-400 line-through">
                  {originalPrice.toLocaleString("fa")} تومان
                </div>
              )}
            </div>

            {isPurchased ? (
              <Link
                to="/dashboard"
                className="w-full glow-button py-4 rounded-lg font-semibold text-center block mb-4"
              >
                ادامه یادگیری
              </Link>
            ) : (
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full glow-button py-4 rounded-lg font-semibold"
                >
                  افزودن به سبد خرید
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate("/checkout");
                  }}
                  className="w-full glass py-4 rounded-lg font-semibold text-center block hover:bg-white/10 transition-colors"
                >
                  خرید فوری
                </button>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">سطح دوره:</span>
                <span className="text-white">
                  {course.level || "نامشخص"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">مدت زمان:</span>
                <span className="text-white">
                  {course.duration || "نامشخص"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">تعداد درس:</span>
                <span className="text-white">{lessonsCount} درس</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">زبان:</span>
                <span className="text-white">
                  {course.language || "نامشخص"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">دسترسی:</span>
                <span className="text-white">مادام‌العمر</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 space-x-reverse pt-4 border-t border-white/10">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Heart className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Download className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Box */}
      <div className="glass rounded-xl p-4 md:p-6 mb-8 mt-8">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">گواهی پایان دوره</h3>
            <p className="text-gray-400 text-sm">
              پس از تکمیل دوره، گواهی معتبر دریافت خواهید کرد
            </p>
          </div>
        </div>
      </div>

      {/* Instructor Info (خلاصه پایین صفحه) */}
      {teacher && (
        <div className="glass rounded-xl p-4 md:p-8 mb-8 mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            درباره مدرس
          </h2>
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 space-x-reverse">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0 sm:ml-4">
              <img
                src={
                  teacher.profile?.image || "./images/pexels-photo-1043471.jpeg"
                }
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-right">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {teacher.name}
              </h3>
              <p className="text-purple-400 mb-3 text-sm md:text-base">
                {teacher.profile?.specialty || "مدرس دوره‌های تخصصی"}
              </p>
              <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
                {teacher.profile?.bio ||
                  "اطلاعات بیوگرافی برای این مدرس ثبت نشده است."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 space-x-reverse text-xs md:text-sm text-gray-400">
                {teacher.rating !== undefined && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span>{teacher.rating.toFixed(1)} امتیاز مدرس</span>
                  </div>
                )}
                {teacher.students !== undefined && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Users className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    <span>
                      {teacher.students.toLocaleString("fa")} دانشجو
                    </span>
                  </div>
                )}
                {teacher.courses !== undefined && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{teacher.courses} دوره</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Link
                  to={`/instructor/${teacher.id}`}
                  className="glow-button px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium inline-block"
                >
                  مشاهده پروفایل کامل
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">دوره‌های مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((relatedCourse) => (
              <div
                key={relatedCourse.id}
                className="glass rounded-xl overflow-hidden card-hover"
              >
                <div className="relative">
                  <img
                    src={
                      relatedCourse.image ||
                      "./images/pexels-photo-11035380.jpeg"
                    }
                    alt={relatedCourse.title}
                    className="w-full h-32 object-cover"
                  />
                  {relatedCourse.original_price &&
                    relatedCourse.original_price > relatedCourse.price && (
                      <div className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full text-xs font-medium">
                        %
                        {Math.round(
                          ((relatedCourse.original_price -
                            relatedCourse.price) /
                            relatedCourse.original_price) *
                            100
                        )}{" "}
                        تخفیف
                      </div>
                    )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {relatedCourse.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    مدرس: {relatedCourse.teacher_name || "نامشخص"}
                  </p>
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {relatedCourse.rating
                          ? relatedCourse.rating.toFixed(1)
                          : "-"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                      <Users className="h-3 w-3" />
                      <span>
                        {(relatedCourse.students_count || 0).toLocaleString(
                          "fa"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-purple-400 font-semibold text-sm">
                        {relatedCourse.price.toLocaleString("fa")} تومان
                      </span>
                      {relatedCourse.original_price &&
                        relatedCourse.original_price >
                          relatedCourse.price && (
                          <span className="text-gray-500 line-through text-xs mr-1">
                            {relatedCourse.original_price.toLocaleString("fa")}
                          </span>
                        )}
                    </div>
                    <Link
                      to={`/course/${relatedCourse.id}`}
                      className="glow-button px-3 py-1 rounded text-xs font-medium"
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

export default CourseDetailsPage;

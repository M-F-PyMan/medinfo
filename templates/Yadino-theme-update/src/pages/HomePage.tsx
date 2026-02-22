import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

// -----------------------------
// Types (TS Strict Mode)
// -----------------------------
interface Course {
  id: number;
  title: string;
  slug: string;
  preview_image: string | null;
  price: number;
  sale_price: number | null;
  teacher_name: string;
  lessons_count: number;
  average_rating: number;
  comments_count: number;
}

interface InstructorProfile {
  experience: number | null;
  degree: string | null;
}

interface Profile {
  image: string | null;
  bio: string | null;
  specialty: string | null;
}

interface Instructor {
  id: number;
  name: string;
  username: string;
  profile: Profile;
  instructor_profile: InstructorProfile;
  students: number;
  courses: number;
  rating: number;
}

interface HomeApiResponse {
  newest: Course[];
  best_sellers: Course[];
  top_rated: Course[];
  categories: string[];
}

// -----------------------------
// API Base URL
// -----------------------------
const BASE_URL = "http://127.0.0.1:8000/api/";

function HomePage() {
  // -----------------------------
  // States
  // -----------------------------
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slider states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // -----------------------------
  // Slider Data
  // -----------------------------
  const sliderData = [
    {
      id: 1,
      title: "آموزش‌های تخصصی مد اینفو",
      subtitle: "یادگیری با بهترین اساتید",
      description:
        "در مد اینفو، آموزش‌ها با استانداردهای جهانی و با تمرکز بر نیازهای واقعی بازار ارائه می‌شوند.",
      image: "/images/slider1.jpg",
      gradient: "from-purple-600/80 to-blue-600/80",
      stats: { students: "15K+", courses: "120+", rating: "4.9" },
    },
    {
      id: 2,
      title: "دوره‌های کاربردی و پروژه‌محور",
      subtitle: "یادگیری با انجام پروژه",
      description:
        "تمام دوره‌های مد اینفو بر اساس پروژه‌های واقعی طراحی شده‌اند تا شما را برای ورود به بازار کار آماده کنند.",
      image: "/images/slider2.jpg",
      gradient: "from-blue-600/80 to-purple-600/80",
      stats: { students: "12K+", courses: "90+", rating: "4.8" },
    },
  ];

  // -----------------------------
  // Load Home API + Instructors API
  // -----------------------------
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const homeRes = await fetch(`${BASE_URL}home/`);
        if (!homeRes.ok) {
          setError("خطا در دریافت اطلاعات صفحه اصلی");
          return;
        }

        const homeData: HomeApiResponse = await homeRes.json();

        const featured =
          homeData.top_rated.length > 0
            ? homeData.top_rated
            : homeData.newest;

        setFeaturedCourses(featured);

        const instRes = await fetch(`${BASE_URL}instructors/?limit=4`);
        if (!instRes.ok) {
          setError("خطا در دریافت اطلاعات مدرسان");
          return;
        }

        const instData: Instructor[] = await instRes.json();
        setInstructors(instData);
      } catch (err) {
        setError("خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    }

    void loadData(); // جلوگیری از هشدار TS
  }, []);

  // -----------------------------
  // Slider Auto-play
  // -----------------------------
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, sliderData.length]);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? sliderData.length - 1 : prev - 1
    );

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);

  const goToSlide = (index: number) => setCurrentSlide(index);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="text-white">

      {/* -------------------------
          Hero Section
      -------------------------- */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-bg.jpg"
          alt="مد اینفو"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            آموزش‌های تخصصی <span className="text-purple-400">مد اینفو</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 mb-8">
            یادگیری با بهترین اساتید و دوره‌های پروژه‌محور،
            مخصوص کسانی که می‌خواهند حرفه‌ای وارد بازار کار شوند.
          </p>

          <div className="flex justify-center space-x-4 space-x-reverse">
            <Link
              to="/courses"
              className="glow-button px-8 py-4 rounded-lg text-lg font-medium"
            >
              مشاهده دوره‌ها
            </Link>

            <Link
              to="/about"
              className="glass px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition"
            >
              درباره مد اینفو
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------
          Slider Section
      -------------------------- */}
      <section className="relative w-full h-[500px] overflow-hidden mt-16">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
            ></div>

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <h3 className="text-2xl md:text-3xl text-purple-200 mb-4">
                {slide.subtitle}
              </h3>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                {slide.description}
              </p>

              <div className="flex space-x-6 space-x-reverse mt-6 text-gray-200">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Users className="h-5 w-5" />
                  <span>{slide.stats.students}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <BookOpen className="h-5 w-5" />
                  <span>{slide.stats.courses}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{slide.stats.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full transition"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full transition"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-purple-400" : "bg-white/40"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* -------------------------
          Featured Courses (Dynamic)
      -------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            دوره‌های محبوب مد اینفو
          </h2>
          <p className="text-xl text-gray-400">
            از پرطرفدارترین دوره‌های آموزشی ما دیدن کنید
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-400">در حال بارگذاری...</div>
        )}

        {error && (
          <div className="text-center text-red-400">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="glass rounded-xl overflow-hidden card-hover"
              >
                <img
                  src={course.preview_image || "/images/default-course.jpg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    مدرس: {course.teacher_name}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">
                        {course.average_rating}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {course.comments_count.toLocaleString("fa")} نظر
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-400">
                      {(course.sale_price || course.price).toLocaleString(
                        "fa"
                      )}{" "}
                      تومان
                    </span>

                    <Link
                      to={`/course/${course.slug}`}
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

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 space-x-reverse glass px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <span>مشاهده همه دوره‌ها</span>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* -------------------------
          Instructors Section (Dynamic)
      -------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            مدرسان برتر مد اینفو
          </h2>
          <p className="text-xl text-gray-400">
            از بهترین متخصصان صنعت یاد بگیرید
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-400">در حال بارگذاری...</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="glass rounded-xl overflow-hidden card-hover"
              >
                <div className="relative">
                  <img
                    src={inst.profile.image || "/images/default-user.jpg"}
                    alt={inst.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                    {inst.instructor_profile.experience || 0} سال تجربه
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{inst.name}</h3>
                  <p className="text-purple-400 mb-3">
                    {inst.profile.specialty || "مدرس دوره‌های تخصصی"}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {inst.profile.bio || "مدرس حرفه‌ای در مد اینفو"}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{inst.rating}</span>
                    </div>

                    <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{inst.students.toLocaleString("fa")} نفر</span>
                    </div>

                    <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                      <BookOpen className="h-4 w-4" />
                      <span>{inst.courses} دوره</span>
                    </div>
                  </div>

                  <Link
                    to={`/instructor/${inst.id}`}
                    className="w-full glow-button py-2 rounded-lg text-sm font-medium text-center block"
                  >
                    مشاهده پروفایل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* -------------------------
    Features Section (Static)
-------------------------- */}
    <section className="bg-black/20 py-20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            چرا <span className="text-purple-400">مد اینفو</span>؟
          </h2>
          <p className="text-gray-400 text-lg">
            ما بهترین تجربهٔ یادگیری را برای شما فراهم کرده‌ایم
          </p>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Feature 1 */}
              <div className="glass p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">اساتید حرفه‌ای</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  یادگیری از بهترین متخصصان صنعت با تجربهٔ واقعی در پروژه‌های بزرگ.
                </p>
              </div>

                    {/* Feature 2 */}
              <div className="glass p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                   <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">دوره‌های پروژه‌محور</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  تمام دوره‌ها بر اساس پروژه‌های واقعی طراحی شده‌اند تا آمادهٔ بازار کار شوید.
                </p>
              </div>

                    {/* Feature 3 */}
              <div className="glass p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Star className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">کیفیت تضمین‌شده</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  محتوای آموزشی با استانداردهای جهانی و کیفیت بالا برای یادگیری عمیق.
                </p>
                </div>

                    {/* Feature 4 */}
              <div className="glass p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">پشتیبانی دائمی</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  تیم پشتیبانی مد اینفو همیشه همراه شماست تا هیچ‌وقت در مسیر یادگیری تنها نمانید.
                </p>
              </div>

                  </div>
      </div>
    </section>


    </div>
  );
}
export default HomePage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Users,
  BookOpen,
  Search,
  MapPin,
} from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api";

interface InstructorCategory {
  id: number;
  name: string;
  slug: string;
}

function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [ordering, setOrdering] = useState<string>("");

  const [categories, setCategories] = useState<InstructorCategory[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch categories
  // -----------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/instructor-categories/`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (e) {
        console.error("Error loading categories:", e);
      }
    };
    fetchCategories();
  }, []);

  // -----------------------------
  // Fetch instructors (with category + ordering)
  // -----------------------------
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.append("category", selectedCategory);
        }
        if (ordering) {
          params.append("ordering", ordering);
        }

        const url =
          params.toString().length > 0
            ? `${API_BASE}/instructors/?${params.toString()}`
            : `${API_BASE}/instructors/`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setInstructors(data);
        }
      } catch (e) {
        console.error("Error loading instructors:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [selectedCategory, ordering]);

  // -----------------------------
  // Filtering on frontend (search)
  // -----------------------------
  const filteredInstructors = instructors.filter((inst) => {
    const nameMatch = inst.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const specialty = inst.profile?.specialty || "";
    const specialtyMatch = specialty
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return nameMatch || specialtyMatch;
  });

  // -----------------------------
  // Stats
  // -----------------------------
  const totalStudents = instructors.reduce(
    (sum, inst) => sum + (inst.students || 0),
    0
  );

  const totalCourses = instructors.reduce(
    (sum, inst) => sum + (inst.courses || 0),
    0
  );

  const avgRating =
    instructors.length > 0
      ? (
          instructors.reduce(
            (sum, inst) => sum + (inst.rating || 0),
            0
          ) / instructors.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        در حال بارگذاری مدرسان...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">مدرسان یادینو</h1>
        <p className="text-xl text-gray-400">
          با بهترین متخصصان صنعت آشنا شوید
        </p>
      </div>

      {/* Search + Filters */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
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

          {/* Category + Ordering */}
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all" className="bg-slate-800">
                همه مدرسان
              </option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.slug}
                  className="bg-slate-800"
                >
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              className="w-40 py-3 px-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">مرتب‌سازی</option>
              <option value="rating">بالاترین امتیاز</option>
              <option value="students">بیشترین دانشجو</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {instructors.length}
          </div>
          <div className="text-gray-400">مدرس خبره</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {totalStudents.toLocaleString("fa")}
          </div>
          <div className="text-gray-400">دانشجو</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {totalCourses}
          </div>
          <div className="text-gray-400">دوره آموزشی</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {avgRating}
          </div>
          <div className="text-gray-400">میانگین امتیاز</div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredInstructors.map((inst) => (
          <div
            key={inst.id}
            className="glass rounded-xl overflow-hidden card-hover"
          >
            <div className="relative">
              <img
                src={
                  inst.profile?.image ||
                  "./images/pexels-photo-1043471.jpeg"
                }
                alt={inst.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                {inst.instructor_profile?.experience
                  ? `${inst.instructor_profile.experience} سال`
                  : "—"}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{inst.name}</h3>
              <p className="text-purple-400 mb-3">
                {inst.profile?.specialty || "مدرس دوره‌های تخصصی"}
              </p>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {inst.profile?.bio ||
                  "اطلاعات بیوگرافی برای این مدرس ثبت نشده است."}
              </p>

              <div className="flex items-center space-x-2 space-x-reverse mb-4 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{inst.profile?.field || "—"}</span>
              </div>

              {/* Skills (از specialty به‌صورت تگ) */}
              <div className="flex flex-wrap gap-1 mb-4">
                {(inst.profile?.specialty || "")
                  .split(" ")
                  .slice(0, 3)
                  .map((skill: string, i: number) =>
                    skill ? (
                      <span
                        key={i}
                        className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ) : null
                  )}
              </div>

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

      {filteredInstructors.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👨‍🏫</div>
          <h3 className="text-2xl font-semibold mb-2">
            هیچ مدرسی یافت نشد
          </h3>
          <p className="text-gray-400">
            لطفا کلمات جستجو یا فیلترها را تغییر دهید
          </p>
        </div>
      )}

      {/* Join as Instructor */}
      <div className="mt-16 glass rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">مدرس هستید؟</h2>
        <p className="text-gray-400 mb-6">
          به جمع مدرسان ما بپیوندید و تجربه و دانش خود را با هزاران
          دانشجو به اشتراک بگذارید
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

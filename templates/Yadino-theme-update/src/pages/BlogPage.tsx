import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag, Search, TrendingUp } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000/api';

interface Category {
  id: number;
  title: string;
  slug: string;
}

interface TagType {
  id: number;
  title: string;
  slug: string;
}

interface Author {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  category: Category | null;
  tags: TagType[];
  author: Author | null;
  reading_time: number;
  created_at: string;
}

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch posts + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/blog/posts/`),
          fetch(`${API_BASE}/blog/categories/`),
        ]);

        if (!postsRes.ok) throw new Error('خطا در دریافت مقالات');
        if (!categoriesRes.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها');

        const postsData: Post[] = await postsRes.json();
        const categoriesData: Category[] = await categoriesRes.json();

        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || 'خطای ناشناخته');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryOptions = [
    { id: 'all', name: 'همه مقالات' },
    ...categories.map((c) => ({ id: c.slug, name: c.title })),
  ];

  const filteredPosts = posts.filter((post) => {
    const text = (post.title + ' ' + (post.excerpt || '')).toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      (post.category && post.category.slug === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = featuredPost
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <p className="text-gray-400">در حال بارگذاری مقالات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">وبلاگ مد اینفو</h1>
        <p className="text-xl text-gray-400">آخرین مقالات و نکات آموزشی</p>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-xl p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-4 bg:white/5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id} className="bg-slate-800">
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="glass rounded-xl overflow-hidden mb-12 card-hover">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src={featuredPost.cover_image || '/images/default-blog-cover.jpg'}
                alt={featuredPost.title}
                className="w-full h-48 sm:h-64 lg:h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-purple-500 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 space-x-reverse">
                <TrendingUp className="h-4 w-4" />
                <span>مقاله ویژه</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 space-x-reverse mb-4 text-xs sm:text-sm text-gray-400">
                {featuredPost.author && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {featuredPost.author.first_name} {featuredPost.author.last_name}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{new Date(featuredPost.created_at).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 leading-tight">
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="hover:text-purple-400 transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="glow-button px-4 py-2 rounded-lg text-sm font-medium self-start sm:self-auto"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {regularPosts.map((post) => (
          <article key={post.id} className="glass rounded-xl overflow-hidden card-hover">
            <div className="relative">
              <img
                src={post.cover_image || '/images/default-blog-cover.jpg'}
                alt={post.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs">
                {post.reading_time} دقیقه
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 space-x-reverse mb-3 text-xs sm:text-sm text-gray-400">
                {post.author && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {post.author.first_name} {post.author.last_name}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-3 line-clamp-2">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-purple-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3 space-x-reverse text-xs text-gray-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Tag className="h-3 w-3" />
                    <span>{post.tags[0]?.title || 'بدون برچسب'}</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium self-start sm:self-auto"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold mb-2">هیچ مقاله‌ای یافت نشد</h3>
          <p className="text-gray-400">لطفا کلمات جستجو یا فیلترها را تغییر دهید</p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 glass rounded-xl p-4 sm:p-6 lg:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">عضویت در خبرنامه</h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          از آخرین مقالات و نکات آموزشی با خبر شوید
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="glow-button px-6 py-3 rounded-lg font-semibold">
            عضویت
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  User,
  Eye,
  Tag,
  Share2,
  Heart,
  ArrowLeft,
  Clock,
} from 'lucide-react';

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

interface PostDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: Category | null;
  tags: TagType[];
  author: Author | null;
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
}

interface PostListItem {
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

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/blog/posts/${slug}/`);
        if (!res.ok) throw new Error('مقاله یافت نشد');

        const data: PostDetail = await res.json();
        setPost(data);

        // fetch related posts by category
        const listRes = await fetch(`${API_BASE}/blog/posts/`);
        if (listRes.ok) {
          const listData: PostListItem[] = await listRes.json();
          const related = listData
            .filter(
              (p) =>
                p.slug !== data.slug &&
                p.category &&
                data.category &&
                p.category.id === data.category.id
            )
            .slice(0, 4);
          setRelatedPosts(related);
        }
      } catch (err: any) {
        setError(err.message || 'خطای ناشناخته');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <p className="text-gray-400">در حال بارگذاری مقاله...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <p className="text-red-400 mb-4">{error || 'مقاله یافت نشد'}</p>
        <Link to="/blog" className="text-purple-400 hover:text-purple-300">
          بازگشت به وبلاگ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-purple-400">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-purple-400">
          وبلاگ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{post.title}</span>
      </nav>

      {/* Article Header */}
      <article className="glass rounded-xl overflow-hidden mb-8">
        <img
          src={post.cover_image || '/images/default-blog-cover.jpg'}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-8">
          <div className="mb-6">
            {post.category && (
              <span className="bg-purple-500 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {post.category.title}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-white/10">
            {post.author && (
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-bold">
                  {post.author.first_name?.[0]}
                  {post.author.last_name?.[0]}
                </div>
                <div>
                  <div className="font-medium">
                    {post.author.first_name} {post.author.last_name}
                  </div>
                  <div className="text-sm text-gray-400">{post.author.email}</div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} دقیقه</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              direction: 'rtl',
              textAlign: 'right',
            }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <Tag className="h-5 w-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-red-400 transition-colors">
                <Heart className="h-5 w-5" />
                <span>پسندیدن</span>
              </button>
              <button className="flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-purple-400 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>اشتراک‌گذاری</span>
              </button>
            </div>
            <Link
              to="/blog"
              className="flex items-center space-x-2 space-x-reverse text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>بازگشت به وبلاگ</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Comments Section – فعلاً ماک، بعداً می‌تونیم به API وصلش کنیم */}
      <div className="glass rounded-xl p-6 mt-10 mb-10">
        <h2 className="text-xl font-semibold mb-6">نظرات کاربران</h2>
        <p className="text-gray-400 text-sm mb-4">
          سیستم نظرات هنوز به بک‌اند متصل نشده و فعلاً نمایشی است.
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              نظر خود را بنویسید
            </label>
            <textarea
              id="comment"
              rows={3}
              className="w-full rounded-md bg-white/5 border border-white/10 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="نظر شما..."
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-x-reverse space-y-4 md:space-y-0">
            <input
              type="text"
              className="flex-1 rounded-md bg-white/5 border border:white/10 border-white/10 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="نام شما"
            />
            <input
              type="email"
              className="flex-1 rounded-md bg-white/5 border border-white/10 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="ایمیل (اختیاری)"
            />
          </div>
          <button
            type="submit"
            className="glow-button px-6 py-2 rounded-md text-sm font-medium text-white"
          >
            ارسال نظر
          </button>
        </form>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="flex items-center space-x-4 space-x-reverse p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <img
                  src={relatedPost.cover_image || '/images/default-blog-cover.jpg'}
                  alt={relatedPost.title}
                  className="w-20 h-14 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-2 mb-1">
                    {relatedPost.title}
                  </h3>
                  <div className="text-sm text-gray-400">
                    {relatedPost.author
                      ? `${relatedPost.author.first_name} ${relatedPost.author.last_name}`
                      : 'مد اینفو'}{' '}
                    • {new Date(relatedPost.created_at).toLocaleDateString('fa-IR')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPostPage;

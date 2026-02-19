import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ShoppingCart,
  ArrowLeft,
  Star,
  Heart,
  CreditCard,
  Award,
  Headphones,
  Smartphone,
  Shield,
} from "lucide-react";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, loading, removeFromCart, getSummary, checkout } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [summary, setSummary] = useState<any>(null);

  const loadSummary = async () => {
    const data = await getSummary(discountCode || undefined);
    setSummary(data);
  };

  useEffect(() => {
    if (cart) loadSummary();
  }, [cart]);

  if (loading || !cart) {
    return (
      <div className="py-16 text-center text-gray-300">
        در حال بارگذاری...
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 rtl">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-purple-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-purple-200">
              سبد خرید شما خالی است
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              هنوز هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید
            </p>
            <Link
              to="/courses"
              className="glow-button px-8 py-4 rounded-lg font-semibold inline-flex items-center space-x-2 space-x-reverse"
            >
              <span>مشاهده دوره‌ها</span>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rtl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-200 mb-2">سبد خرید</h1>
          <p className="text-lg text-gray-400">دوره‌های انتخابی شما</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Panel: Cart Items + Discount */}
          <div className="space-y-6 order-1 lg:order-1">
            {/* Cart Items */}
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">
                دوره‌های سبد خرید ({cart.items.length} مورد)
              </h2>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 space-x-reverse p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    {/* Course Image */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <img
                        src={item.course.preview_image}
                        alt={item.course.title}
                        className="w-full sm:w-20 h-32 sm:h-16 object-cover rounded-lg"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-purple-200 mb-1 line-clamp-2">
                        {item.course.title}
                      </h3>

                      <p className="text-gray-400 text-xs sm:text-sm mb-2">
                        مدرس: {item.course.teacher_name}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                i < Math.round(item.course.average_rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400">
                          {item.course.average_rating} (
                          {item.course.comments_count} نظر )
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-lg sm:text-xl font-bold text-purple-300">
                        {item.price_at_time.toLocaleString("fa")} تومان
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end sm:justify-start space-x-2 space-x-reverse w-full sm:w-auto">
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.course.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Code */}
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-purple-200 mb-4">
                کد تخفیف
              </h3>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 space-x-reverse">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="کد تخفیف خود را وارد کنید"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
                <button
                  onClick={loadSummary}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  اعمال
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Order Summary */}
          <div className="glass rounded-2xl p-4 sm:p-6 order-2 lg:order-2">
            <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">
              خلاصه سفارش
            </h2>

            {summary && (
              <>
                {/* Price Breakdown */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">قیمت دوره‌ها:</span>
                    <span className="text-purple-200">
                      {summary.total_before.toLocaleString("fa")} تومان
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">تخفیف:</span>
                    <span className="text-green-400">
                      - {summary.discount.toLocaleString("fa")} تومان
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 sm:pt-4">
                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span className="text-purple-200">مجموع:</span>
                      <span className="text-purple-300">
                        {summary.total_after.toLocaleString("fa")} تومان
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-4 sm:mb-6">
                  <button
                    onClick={async () => {
                      const url = await checkout(discountCode || undefined);
                      if (url) window.location.href = url;
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 rounded-lg font-semibold text-center block transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base"
                  >
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>ادامه خرید</span>
                  </button>
                  <Link
                    to="/courses"
                    className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 sm:py-4 rounded-lg font-semibold text-center block transition-colors flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>ادامه خرید</span>
                  </Link>
                </div>
              </>
            )}

            {/* Features */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">دسترسی مادام‌العمر</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                <span className="text-gray-300">گواهینامه معتبر</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm">
                <Headphones className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                <span className="text-gray-300">پشتیبانی ۲۴/۷</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm">
                <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                <span className="text-gray-300">قابل مشاهده در موبایل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

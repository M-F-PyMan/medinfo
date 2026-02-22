import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const { cart, loading, getSummary, checkout } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 rtl text-center">
          <ShoppingCart className="h-24 w-24 text-purple-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-purple-200">
            سبد خرید شما خالی است
          </h1>
          <Link to="/courses" className="text-purple-400 hover:text-purple-300">
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rtl">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 space-x-reverse">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">۱</div>
              <span className="text-purple-200 font-semibold text-xs sm:text-sm">سبد خرید</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-purple-600 rounded-full"></div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">۲</div>
              <span className="text-purple-200 font-semibold text-xs sm:text-sm">تسویه حساب</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">۳</div>
              <span className="text-gray-400 font-semibold text-xs sm:text-sm">تکمیل</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-1">

            {/* Discount Code */}
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">
                کد تخفیف
              </h2>

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

          {/* Left Column - Summary */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="glass rounded-2xl p-4 sm:p-6">

              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">
                خلاصه سفارش
              </h2>

              {/* Items */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-white/5 border border-white/10">
                    <img
                      src={item.course.preview_image}
                      alt={item.course.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-purple-200 text-xs sm:text-sm line-clamp-2">
                        {item.course.title}
                      </h3>
                      <div className="text-purple-300 font-bold text-xs sm:text-sm">
                        {item.price_at_time.toLocaleString("fa")} تومان
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {summary && (
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">قیمت دوره‌ها:</span>
                    <span className="text-purple-200">
                      {summary.total_before.toLocaleString("fa")} تومان
                    </span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">تخفیف:</span>
                    <span className="text-green-400">
                      - {summary.discount.toLocaleString("fa")} تومان
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-2 sm:pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span className="text-purple-200">مجموع:</span>
                      <span className="text-purple-300">
                        {summary.total_after.toLocaleString("fa")} تومان
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={async () => {
                  setIsLoading(true);
                  const url = await checkout(discountCode || undefined);
                  setIsLoading(false);
                  if (url) window.location.href = url;
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 rounded-lg font-semibold text-center block transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{isLoading ? "در حال انتقال..." : "پرداخت امن"}</span>
              </button>

              {/* Security */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  <span>پرداخت امن با رمزنگاری SSL</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <span>پذیرش تمام کارتهای بانکی</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <span>ضمانت بازگشت وجه تا ۳۰ روز</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

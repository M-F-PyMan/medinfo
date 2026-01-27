import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, User, Mail, MapPin, Wallet, Calendar, ChevronDown, Shield, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock wallet balance - in real app, get from user context
  const walletBalance = 150000;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('لطفا با قوانین و مقررات موافقت کنید');
      return;
    }

    setIsLoading(true);

    // Check wallet balance if wallet payment is selected
    if (paymentMethod === 'wallet' && walletBalance < getTotalPrice()) {
      alert('موجودی کیف پول شما کافی نیست');
      setIsLoading(false);
      return;
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Always succeed for demo purposes
    clearCart();
    navigate('/payment-success', {
      state: {
        orderNumber: `ORD-${Date.now()}`,
        amount: getTotalPrice(),
        courses: cartItems,
        paymentMethod: paymentMethod
      }
    });

    setIsLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 rtl text-center">
          <h1 className="text-3xl font-bold mb-4 text-purple-200">سبد خرید شما خالی است</h1>
          <Link to="/courses" className="text-purple-400 hover:text-purple-300">
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = getTotalPrice();
  const discount = Math.floor(subtotal * 0.05); // 5% discount
  const tax = Math.floor(subtotal * 0.09); // 9% tax
  const total = subtotal - discount + tax;

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
          {/* Right Column - Main Forms */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-1">
            {/* Personal Information */}
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">اطلاعات شخصی</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-right"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-right"
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-right"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-right"
                    placeholder="شماره تلفن خود را وارد کنید"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">آدرس صورتحساب</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400 appearance-none text-right"
                  >
                    <option value="" className="text-gray-400">انتخاب استان</option>
                    <option value="tehran" className="text-gray-900">تهران</option>
                    <option value="isfahan" className="text-gray-900">اصفهان</option>
                    <option value="shiraz" className="text-gray-900">شیراز</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400 appearance-none text-right"
                  >
                    <option value="" className="text-gray-400">انتخاب شهر</option>
                    <option value="tehran" className="text-gray-900">تهران</option>
                    <option value="isfahan" className="text-gray-900">اصفهان</option>
                    <option value="shiraz" className="text-gray-900">شیراز</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-right"
                  placeholder="آدرس کامل خود را وارد کنید"
                />
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-right"
                  placeholder="کد پستی ۱۰ رقمی"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">روش پرداخت</h2>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Bank Card */}
                <label className={`flex items-center p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'card' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 ml-3" />
                  <div>
                    <div className="font-medium text-purple-200 text-sm sm:text-base">کارت بانکی</div>
                    <div className="text-xs sm:text-sm text-gray-400">پرداخت با کارتهای عضو شتاب</div>
                  </div>
                </label>

                {/* Wallet */}
                <label className={`flex items-center p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'wallet' 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 ml-3" />
                  <div>
                    <div className="font-medium text-purple-200 text-sm sm:text-base">کیف پول</div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      پرداخت از کیف پول (موجودی: {walletBalance.toLocaleString('fa')} تومان)
                    </div>
                  </div>
                </label>

                {/* Installment */}
                <label className={`flex items-center p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'installment' 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="installment"
                    checked={paymentMethod === 'installment'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 ml-3" />
                  <div>
                    <div className="font-medium text-purple-200 text-sm sm:text-base">پرداخت اقساطی</div>
                    <div className="text-xs sm:text-sm text-gray-400">پرداخت در ۳ قسط بدون کارمزد</div>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Left Column - Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-200 mb-4 sm:mb-6">خلاصه سفارش</h2>
              
              {/* Course Items */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-white/5 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-purple-200 text-xs sm:text-sm line-clamp-2">{item.title}</h3>
                      <div className="text-purple-300 font-bold text-xs sm:text-sm">
                        {item.price.toLocaleString('fa')} تومان
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">قیمت دوره ها:</span>
                  <span className="text-purple-200">
                    {subtotal.toLocaleString('fa')} تومان
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">تخفیف:</span>
                  <span className="text-green-400">- {discount.toLocaleString('fa')} تومان</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">مالیات:</span>
                  <span className="text-purple-200">
                    {tax.toLocaleString('fa')} تومان
                  </span>
                </div>
                <div className="border-t border-white/10 pt-2 sm:pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span className="text-purple-200">مجموع:</span>
                    <span className="text-purple-300">
                      {total.toLocaleString('fa')} تومان
                    </span>
                  </div>
                </div>
              </div>

              {/* Secure Payment Button */}
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={isLoading || !agreedToTerms || (paymentMethod === 'wallet' && walletBalance < total)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 rounded-lg font-semibold text-center block transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{isLoading ? 'در حال پردازش...' : 'پرداخت امن'}</span>
                </button>
              </form>

              {/* Terms Agreement */}
              <div className="mt-4 sm:mt-6 flex items-start space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 bg-white/5 border-white/10 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-300">
                  با قوانین و مقررات و حریم خصوصی موافقم
                </label>
              </div>

              {/* Security and Guarantee Info */}
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
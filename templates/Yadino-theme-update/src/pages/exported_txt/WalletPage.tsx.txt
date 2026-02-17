import React, { useState } from 'react';
import { Wallet, Plus, CreditCard, History, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function WalletPage() {
  const { user } = useAuth();
  const [chargeAmount, setChargeAmount] = useState('');
  const [isCharging, setIsCharging] = useState(false);

  // Mock wallet data - in real app, get from API
  const walletBalance = 500000;
  const transactions = [
    {
      id: '1',
      type: 'charge',
      amount: 200000,
      description: 'شارژ کیف پول',
      date: '۱۴۰۳/۰۸/۲۰',
      status: 'completed'
    },
    {
      id: '2',
      type: 'payment',
      amount: -199000,
      description: 'خرید دوره React',
      date: '۱۴۰۳/۰۸/۱۸',
      status: 'completed'
    },
    {
      id: '3',
      type: 'charge',
      amount: 500000,
      description: 'شارژ کیف پول',
      date: '۱۴۰۳/۰۸/۱۵',
      status: 'completed'
    },
    {
      id: '4',
      type: 'payment',
      amount: -149000,
      description: 'خرید دوره مارکتینگ',
      date: '۱۴۰۳/۰۸/۱۰',
      status: 'completed'
    }
  ];

  const handleCharge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chargeAmount || parseInt(chargeAmount) < 10000) {
      alert('حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است');
      return;
    }

    setIsCharging(true);
    
    // Simulate charge process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`کیف پول شما با مبلغ ${parseInt(chargeAmount).toLocaleString('fa')} تومان شارژ شد`);
    setChargeAmount('');
    setIsCharging(false);
  };

  const quickAmounts = [50000, 100000, 200000, 500000];

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-center">
        <h1 className="text-3xl font-bold mb-4">لطفا ابتدا وارد شوید</h1>
        <a href="/login" className="text-purple-400 hover:text-purple-300">
          صفحه ورود
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      <h1 className="text-3xl font-bold mb-8">کیف پول</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet Balance */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">موجودی کیف پول</h2>
            <div className="text-4xl font-bold text-green-400 mb-4">
              {walletBalance.toLocaleString('fa')} تومان
            </div>
            <p className="text-gray-400">آخرین به‌روزرسانی: امروز</p>
          </div>

          {/* Transaction History */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <History className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-semibold">تاریخچه تراکنش‌ها</h2>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'charge' 
                        ? 'bg-green-500/20' 
                        : 'bg-red-500/20'
                    }`}>
                      {transaction.type === 'charge' ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-gray-400">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('fa')} تومان
                  </div>
                </div>
              ))}
            </div>

            {transactions.length === 0 && (
              <div className="text-center py-12">
                <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">هیچ تراکنشی یافت نشد</h3>
                <p className="text-gray-400">تاریخچه تراکنش‌های شما اینجا نمایش داده می‌شود</p>
              </div>
            )}
          </div>
        </div>

        {/* Charge Wallet */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6 sticky top-24">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <Plus className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-semibold">شارژ کیف پول</h2>
            </div>

            <form onSubmit={handleCharge} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">مبلغ شارژ (تومان)</label>
                <input
                  type="number"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  min="10000"
                  step="1000"
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مبلغ مورد نظر را وارد کنید"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">حداقل مبلغ شارژ: ۱۰,۰۰۰ تومان</p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium mb-3">مبالغ پیشنهادی</label>
                <div className="grid grid-cols-2 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setChargeAmount(amount.toString())}
                      className="py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
                    >
                      {amount.toLocaleString('fa')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isCharging || !chargeAmount}
                className="w-full glow-button py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
              >
                {isCharging ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>در حال پردازش...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>شارژ کیف پول</span>
                  </>
                )}
              </button>
            </form>

            {/* Wallet Benefits */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-4">مزایای کیف پول</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span>✅</span>
                  <span>پرداخت سریع و آسان</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span>✅</span>
                  <span>بدون نیاز به وارد کردن اطلاعات کارت</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span>✅</span>
                  <span>امنیت بالا</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span>✅</span>
                  <span>قابلیت پرداخت چندین دوره</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="glass rounded-xl p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">
            {transactions.filter(t => t.type === 'charge').reduce((sum, t) => sum + t.amount, 0).toLocaleString('fa')}
          </div>
          <div className="text-gray-400 text-sm">کل شارژ‌ها</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <ArrowUpRight className="h-8 w-8 text-red-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">
            {Math.abs(transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0)).toLocaleString('fa')}
          </div>
          <div className="text-gray-400 text-sm">کل خریدها</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <History className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">{transactions.length}</div>
          <div className="text-gray-400 text-sm">تعداد تراکنش‌ها</div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
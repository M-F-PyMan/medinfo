import React, { useEffect, useState } from "react";
import {
  Bar,
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Users,
  BookOpen,
  CreditCard,
  Wallet,
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  GraduationCap,
  School,
  ArrowRightCircle,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const BASE_URL = "http://localhost:8000/api/admin/dashboard/";

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<any>(null);

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!data) {
    return (
      <div className="text-center text-gray-300 py-20 text-xl">
        در حال بارگذاری داشبورد...
      </div>
    );
  }

  // Extract tabs
  const overview = data.admin_overview;
  const finance = data.finance_dashboard;
  const instructors = data.instructor_analytics;

  // Chart.js options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#ccc" } },
    },
    scales: {
      x: { ticks: { color: "#aaa" } },
      y: { ticks: { color: "#aaa" } },
    },
  };

  // Monthly revenue chart
  const monthlyRevenueData = {
    labels: overview.monthly_revenue.map((m: any) => m.month),
    datasets: [
      {
        label: "درآمد ماهانه",
        data: overview.monthly_revenue.map((m: any) => m.amount),
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.3)",
      },
    ],
  };

  // Teacher revenue bar chart
  const teacherRevenueData = {
    labels: overview.teacher_revenue.map((t: any) => t.teacher_name),
    datasets: [
      {
        label: "درآمد مدرس‌ها",
        data: overview.teacher_revenue.map((t: any) => t.revenue),
        backgroundColor: "rgba(236, 72, 153, 0.5)",
      },
    ],
  };

  // Finance charts
  const platformVsInstructorData = {
    labels: ["پلتفرم", "مدرس‌ها"],
    datasets: [
      {
        label: "درآمد",
        data: [finance.platform_income, finance.instructor_income],
        backgroundColor: ["#a855f7", "#ec4899"],
      },
    ],
  };

  return (
    <div className="rtl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        {[
          { id: "overview", label: "داشبورد اصلی" },
          { id: "finance", label: "داشبورد مالی" },
          { id: "instructors", label: "آنالیتیکس مدرس‌ها" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl glass transition border-b-2 ${
              activeTab === tab.id
                ? "border-purple-400 text-white bg-white/10"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============================
          TAB 1 — OVERVIEW
      ============================ */}
      {activeTab === "overview" && (
        <div className="space-y-12">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard icon={Users} value={overview.stats.total_users} label="کاربران" />
            <DashboardCard icon={BookOpen} value={overview.stats.total_courses} label="دوره‌ها" />
            <DashboardCard icon={CreditCard} value={overview.stats.total_transactions} label="تراکنش‌ها" />
            <DashboardCard icon={Wallet} value={overview.stats.total_wallet_balance} label="موجودی کل کیف پول" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="درآمد ماهانه">
              <Line data={monthlyRevenueData} options={chartOptions} />
            </ChartCard>

            <ChartCard title="درآمد مدرس‌ها">
              <Bar data={teacherRevenueData} options={chartOptions} />
            </ChartCard>
          </div>

          {/* Latest Transactions */}
          <TableCard title="آخرین تراکنش‌های موفق" data={overview.latest_transactions} />

          <TableCard title="آخرین تراکنش‌های کیف پول" data={overview.latest_wallet} />
        </div>
      )}

      {/* ============================
          TAB 2 — FINANCE
      ============================ */}
      {activeTab === "finance" && (
        <div className="space-y-12">

          {/* Finance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard icon={DollarSign} value={finance.platform_income} label="درآمد پلتفرم" />
            <DashboardCard icon={GraduationCap} value={finance.instructor_income} label="درآمد مدرس‌ها" />
            <DashboardCard icon={Wallet} value={finance.wallet_charges} label="شارژ کیف پول" />
            <DashboardCard icon={CreditCard} value={finance.gateway_payments} label="پرداخت درگاه" />
          </div>

          {/* Finance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="درآمد پلتفرم vs مدرس‌ها">
              <Bar data={platformVsInstructorData} options={chartOptions} />
            </ChartCard>

            <ChartCard title="درخواست‌های شارژ کیف پول">
              <div className="text-gray-300 space-y-2">
                <p>در انتظار: {finance.pending_wallet_charges}</p>
                <p>موفق: {finance.successful_wallet_charges}</p>
                <p>ناموفق: {finance.failed_wallet_charges}</p>
              </div>
            </ChartCard>
          </div>

          {/* Purchases */}
          <TableCard title="آخرین خریدهای دوره" data={finance.course_purchases} />

          {/* Wallet Charge Requests */}
          <TableCard title="درخواست‌های شارژ کیف پول" data={finance.wallet_charge_requests} />
        </div>
      )}

      {/* ============================
          TAB 3 — INSTRUCTOR ANALYTICS
      ============================ */}
      {activeTab === "instructors" && (
        <div className="space-y-12">

          {/* Instructor Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.instructor_stats.map((t: any) => (
              <div key={t.teacher_id} className="glass rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold mb-4">{t.teacher_name}</h3>
                <p className="text-gray-300">درآمد: {t.total_earnings}</p>
                <p className="text-gray-300">تعداد دوره‌ها: {t.course_count}</p>
                <p className="text-gray-300">دانشجوها: {t.student_count}</p>
              </div>
            ))}
          </div>

          {/* Payout Requests */}
          <TableCard title="درخواست‌های تسویه" data={instructors.payout_requests} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------
   Reusable Components
------------------------------ */

function DashboardCard({ icon: Icon, value, label }: any) {
  return (
    <div className="glass rounded-xl p-6 text-center card-hover">
      <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="glass rounded-xl p-6 card-hover">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function TableCard({ title, data }: any) {
  return (
    <div className="glass rounded-xl p-6 card-hover overflow-x-auto">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <table className="w-full text-gray-300 text-sm">
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-b border-white/10">
              {Object.values(row).map((cell: any, j: number) => (
                <td key={j} className="py-2 px-3 whitespace-nowrap">
                  {String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

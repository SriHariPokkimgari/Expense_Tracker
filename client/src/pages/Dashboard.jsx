import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/transactions");
      console.log(res);
      setTransactions(res.data);
    } catch (error) {
      console.log(error.response);
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const chartData = transactions.reduce((acc, t) => {
    const existing = acc.find((item) => item.category === t.category);
    if (existing) {
      existing.amount += parseFloat(t.amount);
    } else {
      acc.push({
        category: t.category,
        amount: parseFloat(t.amount),
        type: t.type,
      });
    }
    return acc;
  }, []);

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const fmt = (amount) =>
    `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-emerald-400 text-sm animate-pulse">
          Loading your dashboard...
        </div>
      </div>
    );

  if (error)
    return (
      <>
        <div className="min-h-screen bg-gray-950 text-white">
          <Navbar handleLogout={handleLogout} />
          <div className=" min-h-screen flex items-center justify-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      </>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Your financial overview</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Balance */}
          <div className="bg-emerald-500 rounded-2xl p-5">
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-1">
              Total Balance
            </p>
            <p className="text-white text-2xl font-bold">{fmt(balance)}</p>
            <p className="text-emerald-100 text-xs mt-2">Income - Expenses</p>
          </div>

          {/* Income */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                Total Income
              </p>
            </div>
            <p className="text-white text-2xl font-bold">{fmt(totalIncome)}</p>
          </div>

          {/* Expenses */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                Total Expenses
              </p>
            </div>
            <p className="text-white text-2xl font-bold">
              {fmt(totalExpenses)}
            </p>
          </div>
        </div>

        {/* Chart + Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">
              Spending by Category
            </h2>
            {chartData.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No data yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={28}>
                  <XAxis
                    dataKey="category"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #1f2937",
                      borderRadius: "8px",
                      color: "#000",
                      fontSize: "11px",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    formatter={(value) => [`₹${value}`, "Amount"]}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.type === "income" ? "#10b981" : "#f87171"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {/* Legend */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
                <span className="text-gray-400 text-xs">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-red-400"></div>
                <span className="text-gray-400 text-xs">Expense</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">
                Recent Transactions
              </h2>
              <button
                onClick={() => navigate("/transactions")}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View all →
              </button>
            </div>
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No transactions yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${t.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                      >
                        {t.type === "income" ? "↑" : "↓"}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {t.category}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {t.description || "No description"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${t.type === "income" ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {t.type === "income" ? "+" : "-"}
                        {fmt(parseFloat(t.amount))}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(t.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

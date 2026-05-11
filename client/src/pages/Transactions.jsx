import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    category_id: "",
    description: "",
    amount: "",
    date: "",
  });
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({ category_id: "", description: "", amount: "", date: "" });
    setEditingTransaction(null);
    setShowForm(false);
    setMessage("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/transactions", formData);
      setMessage(res.data.message);
      fetchTransactions();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleEditClick = (transaction) => {
    console.log(transaction);
    setEditingTransaction(transaction.id);
    setFormData({
      category_id: transaction.category_id || "",
      amount: transaction.amount,
      description: transaction.description || "",
      date: transaction.date.split("T")[0],
    });
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(
        `/transactions/${editingTransaction}`,
        formData,
      );
      setMessage(res.data.message);
      fetchTransactions();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
      setDeleteConfirm(null);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const fmt = (amount) =>
    `₹${parseFloat(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">₹</span>
          </div>
          <span className="font-semibold text-white">ExpenseTracker</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Transactions</h1>
            <p className="text-gray-400 text-sm mt-1">
              {transactions.length} total transactions
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingTransaction(null);
              setFormData({
                category_id: "",
                description: "",
                amount: "",
                date: "",
              });
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <span className="text-lg leading-none">{showForm ? "✕" : "+"}</span>
            {showForm ? "Cancel" : "Add Transaction"}
          </button>
        </div>

        {/* Success message */}
        {message && (
          <div className="mb-5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-emerald-400 text-sm">{message}</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-white mb-5">
              {editingTransaction ? "Edit Transaction" : "New Transaction"}
            </h2>
            <form onSubmit={editingTransaction ? handleUpdate : handleCreate}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Category
                  </label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({ ...formData, category_id: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Description{" "}
                    <span className="text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="What was this for?"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  {editingTransaction
                    ? "Update Transaction"
                    : "Create Transaction"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-6 py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Transactions List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Table Header — hidden on mobile */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-800">
            <div className="col-span-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </div>
            <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              Amount
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="px-5 py-12 text-center">
              <p className="text-gray-500 text-sm animate-pulse">
                Loading transactions...
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && transactions.length === 0 && (
            <div className="px-5 py-12 text-center">
              <p className="text-gray-500 text-sm">No transactions yet</p>
              <p className="text-gray-600 text-xs mt-1">
                Click "Add Transaction" to get started
              </p>
            </div>
          )}

          {/* Transaction rows */}
          {!isLoading &&
            transactions.map((tran) => (
              <div
                key={tran.id}
                className="group border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 transition-colors"
              >
                {/* ── MOBILE layout (< sm) ── */}
                <div className="flex sm:hidden items-center justify-between gap-3 px-4 py-3.5">
                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm shrink-0 ${tran.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                    >
                      {tran.type === "income" ? "↑" : "↓"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {tran.category}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {tran.description || "No description"} ·{" "}
                        {new Date(tran.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="flex items-center gap-2 shrink-0">
                    <p
                      className={`text-sm font-semibold ${tran.type === "income" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {tran.type === "income" ? "+" : "-"}
                      {fmt(tran.amount)}
                    </p>
                    <button
                      onClick={() => handleEditClick(tran)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-xs transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(tran.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-red-500/20 hover:text-red-400 text-xs transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* ── DESKTOP layout (>= sm) ── */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-4">
                  {/* Category */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${tran.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                    >
                      {tran.type === "income" ? "↑" : "↓"}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {tran.category}
                      </p>
                      <p className="text-gray-500 text-xs capitalize">
                        {tran.type}
                      </p>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="col-span-3 flex items-center">
                    <p className="text-gray-400 text-sm truncate">
                      {tran.description || "—"}
                    </p>
                  </div>
                  {/* Date */}
                  <div className="col-span-2 flex items-center">
                    <p className="text-gray-400 text-sm">
                      {new Date(tran.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  {/* Amount */}
                  <div className="col-span-2 flex items-center justify-end">
                    <p
                      className={`text-sm font-semibold ${tran.type === "income" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {tran.type === "income" ? "+" : "-"}
                      {fmt(tran.amount)}
                    </p>
                  </div>
                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(tran)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs transition-colors"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(tran.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-red-500/20 text-gray-300 hover:text-red-400 text-xs transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold mb-2">
              Delete Transaction?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;

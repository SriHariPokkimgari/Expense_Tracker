import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">₹</span>
          </div>
          <span className="font-semibold text-white">ExpenseTracker</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/transactions")}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Transactions
          </button>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

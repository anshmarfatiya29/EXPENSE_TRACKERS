import React, { useEffect, useState } from "react";

const AISuggestions = () => {
  const [budgetTips, setBudgetTips] = useState([]);
  const [incomeTips, setIncomeTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("budget"); // 👈 Track selected button

  useEffect(() => {
    const fetchAISuggestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const budgetRes = await fetch("/api/ai/budget-suggestions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const incomeRes = await fetch("/api/ai/income-suggestions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const budgetData = await budgetRes.json();
        const incomeData = await incomeRes.json();

        setBudgetTips(budgetData.tips || []);
        setIncomeTips(incomeData.tips || []);
      } catch (err) {
        console.error("Error fetching AI suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAISuggestions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">💡 AI Suggestions</h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "budget"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("budget")}
        >
          Budget Suggestions
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("income")}
        >
          Income Suggestions
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading suggestions...</p>
      ) : (
        <div>
          {/* Show Budget */}
          {activeTab === "budget" && (
            <div className="p-5 rounded-xl shadow bg-white">
              <h2 className="text-lg font-semibold mb-3">📊 Budget Suggestions</h2>
              {budgetTips.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {budgetTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No budget suggestions yet.</p>
              )}
            </div>
          )}

          {/* Show Income */}
          {activeTab === "income" && (
            <div className="p-5 rounded-xl shadow bg-white">
              <h2 className="text-lg font-semibold mb-3">💰 Income Growth Suggestions</h2>
              {incomeTips.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {incomeTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No income suggestions yet.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISuggestions;

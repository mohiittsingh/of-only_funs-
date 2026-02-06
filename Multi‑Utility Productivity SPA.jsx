import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("study");

  /* ----------------------------- STUDY PLANNER ----------------------------- */
  const [subjects, setSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");

  /* ----------------------------- EXPENSE TRACKER ---------------------------- */
  const [expenses, setExpenses] = useState([]);
  const [expenseInput, setExpenseInput] = useState({ name: "", amount: "" });

  /* ----------------------------- HABIT TRACKER ------------------------------ */
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");

  /* ----------------------------- LOCAL STORAGE ------------------------------ */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("multiSPA"));
    if (data) {
      setSubjects(data.subjects || []);
      setExpenses(data.expenses || []);
      setHabits(data.habits || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "multiSPA",
      JSON.stringify({ subjects, expenses, habits })
    );
  }, [subjects, expenses, habits]);

  /* ----------------------------- FUNCTIONS ------------------------------ */

  const addSubject = () => {
    if (!subjectInput) return;
    setSubjects([...subjects, { name: subjectInput }]);
    setSubjectInput("");
  };

  const addExpense = () => {
    if (!expenseInput.name || !expenseInput.amount) return;
    setExpenses([...expenses, expenseInput]);
    setExpenseInput({ name: "", amount: "" });
  };

  const totalExpense = expenses.reduce(
    (acc, e) => acc + Number(e.amount),
    0
  );

  const addHabit = () => {
    if (!habitInput) return;
    setHabits([...habits, { name: habitInput, done: false }]);
    setHabitInput("");
  };

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  /* ----------------------------- THEME ------------------------------ */

  const theme = {
    bg: dark
      ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
      : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black",

    card: dark
      ? "bg-gray-900 border-gray-700"
      : "bg-white border-gray-200",

    input: dark
      ? "bg-black border-gray-700 text-white"
      : "bg-white border-gray-300 text-black",
  };

  /* ----------------------------- UI ------------------------------ */

  return (
    <div
      className={`min-h-screen p-6 font-sans transition-colors duration-700 ${theme.bg}`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black font-semibold"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">
        ⚡ Multi‑Utility Productivity SPA
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {[
          { id: "study", label: "Study Planner" },
          { id: "expense", label: "Expense Tracker" },
          { id: "habit", label: "Habit Tracker" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl border ${
              tab === t.id
                ? "bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black"
                : "border-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ---------------- STUDY ---------------- */}
        {tab === "study" && (
          <motion.div
            key="study"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex gap-3 mb-6">
              <input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Add Subject"
                className={`flex-1 p-3 border rounded-xl ${theme.input}`}
              />
              <button
                onClick={addSubject}
                className="px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {subjects.map((s, i) => (
                <div
                  key={i}
                  className={`p-3 border rounded-xl ${theme.card}`}
                >
                  {s.name}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ---------------- EXPENSE ---------------- */}
        {tab === "expense" && (
          <motion.div
            key="expense"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex gap-3 mb-6">
              <input
                placeholder="Expense Name"
                value={expenseInput.name}
                onChange={(e) =>
                  setExpenseInput({ ...expenseInput, name: e.target.value })
                }
                className={`p-3 border rounded-xl flex-1 ${theme.input}`}
              />

              <input
                placeholder="Amount"
                type="number"
                value={expenseInput.amount}
                onChange={(e) =>
                  setExpenseInput({
                    ...expenseInput,
                    amount: e.target.value,
                  })
                }
                className={`p-3 border rounded-xl w-32 ${theme.input}`}
              />

              <button
                onClick={addExpense}
                className="px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((e, i) => (
                <div
                  key={i}
                  className={`p-3 flex justify-between border rounded-xl ${theme.card}`}
                >
                  <span>{e.name}</span>
                  <span>₹ {e.amount}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl mt-6 font-semibold">
              Total: ₹ {totalExpense}
            </h3>
          </motion.div>
        )}

        {/* ---------------- HABIT ---------------- */}
        {tab === "habit" && (
          <motion.div
            key="habit"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex gap-3 mb-6">
              <input
                value={habitInput}
                onChange={(e) => setHabitInput(e.target.value)}
                placeholder="Add Habit"
                className={`flex-1 p-3 border rounded-xl ${theme.input}`}
              />
              <button
                onClick={addHabit}
                className="px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {habits.map((h, i) => (
                <div
                  key={i}
                  onClick={() => toggleHabit(i)}
                  className={`p-3 border rounded-xl cursor-pointer ${
                    h.done
                      ? "bg-green-500/30 line-through"
                      : theme.card
                  }`}
                >
                  {h.name}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="text-center mt-16 opacity-60 text-sm">
        Multi‑Function SPA • Data saved locally
      </footer>
    </div>
  );
}

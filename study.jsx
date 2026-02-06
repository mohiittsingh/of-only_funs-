import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [dark, setDark] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [goalInput, setGoalInput] = useState({});

  /* ---------------- Local Storage ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("studyPlanner");
    if (saved) setSubjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("studyPlanner", JSON.stringify(subjects));
  }, [subjects]);

  /* ---------------- Add Subject ---------------- */
  const addSubject = () => {
    if (!subjectInput) return;

    setSubjects([
      ...subjects,
      { name: subjectInput, goals: [], completed: 0 },
    ]);

    setSubjectInput("");
  };

  /* ---------------- Add Goal ---------------- */
  const addGoal = (index) => {
    if (!goalInput[index]) return;

    const updated = [...subjects];
    updated[index].goals.push({
      text: goalInput[index],
      done: false,
    });

    setSubjects(updated);
    setGoalInput({ ...goalInput, [index]: "" });
  };

  /* ---------------- Toggle Goal ---------------- */
  const toggleGoal = (sIndex, gIndex) => {
    const updated = [...subjects];
    const goal = updated[sIndex].goals[gIndex];

    goal.done = !goal.done;

    const completed = updated[sIndex].goals.filter((g) => g.done).length;
    const total = updated[sIndex].goals.length;

    updated[sIndex].completed = Math.round((completed / total) * 100);

    setSubjects(updated);
  };

  /* ---------------- Theme ---------------- */
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

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`min-h-screen p-6 font-sans transition-colors duration-700 ${theme.bg}`}
    >
      {/* Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black font-semibold shadow-lg"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10"
      >
        📚 Smart Study Planner
      </motion.h1>

      {/* Add Subject */}
      <div className="max-w-xl mx-auto flex gap-3 mb-10">
        <input
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          placeholder="Add Subject"
          className={`flex-1 p-3 border rounded-xl ${theme.input}`}
        />

        <button
          onClick={addSubject}
          className="px-5 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black font-semibold"
        >
          Add
        </button>
      </div>

      {/* Subjects */}
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence>
          {subjects.map((sub, sIndex) => (
            <motion.div
              key={sIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-6 border rounded-2xl shadow-lg ${theme.card}`}
            >
              {/* Subject Title */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{sub.name}</h2>
                <span className="text-sm opacity-70">
                  {sub.completed || 0}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-6">
                <motion.div
                  animate={{ width: `${sub.completed || 0}%` }}
                  className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500"
                />
              </div>

              {/* Add Goal */}
              <div className="flex gap-2 mb-4">
                <input
                  value={goalInput[sIndex] || ""}
                  onChange={(e) =>
                    setGoalInput({
                      ...goalInput,
                      [sIndex]: e.target.value,
                    })
                  }
                  placeholder="Add Daily Goal"
                  className={`flex-1 p-2 border rounded-lg ${theme.input}`}
                />

                <button
                  onClick={() => addGoal(sIndex)}
                  className="px-4 rounded-lg bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black font-semibold"
                >
                  Add
                </button>
              </div>

              {/* Goals List */}
              <div className="space-y-2">
                {sub.goals.map((goal, gIndex) => (
                  <motion.div
                    key={gIndex}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleGoal(sIndex, gIndex)}
                    className={`p-2 rounded-lg cursor-pointer border ${
                      goal.done
                        ? "bg-green-500/20 border-green-400 line-through"
                        : "border-gray-600"
                    }`}
                  >
                    {goal.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 opacity-60 text-sm">
        Data saved in browser • Smart Study Planner SPA
      </footer>
    </div>
  );
}

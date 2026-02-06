import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function  Template() {
  const { scrollYProgress } = useScroll();

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const Section = ({ title, children }) => (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <div className="max-w-2xl text-gray-700 text-lg">{children}</div>
    </motion.section>
  );

  return (
    <div className="bg-gray-100 font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-50"
      />

      {/* Hero Section with Parallax */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold z-10"
        >
          Template for Portfolio 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg text-gray-800 z-10"
        >
          Scroll down to experience smooth animations
        </motion.p>
      </section>

      {/* About */}
      <Section title="About">
        This is a single‑file React Single Page Application enhanced with
        scroll‑based animations, parallax effects, and reveal transitions using
        Framer Motion.
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((p) => (
            <motion.div
              key={p}
              whileHover={{ scale: 1.1, rotate: 1 }}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h3 className="font-semibold text-xl mb-2">Project {p}</h3>
              <p className="text-sm text-gray-600">
                Add your project description here.
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="space-y-4 w-full max-w-md">
          {["React", "Node.js", "PostgreSQL", "AI Integration"].map(
            (skill, i) => (
              <div key={i}>
                <p className="text-left font-medium">{skill}</p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-3 bg-black rounded-full"
                />
              </div>
            )
          )}
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-md space-y-4 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded-xl"
          />
          <textarea
            placeholder="Message"
            className="w-full p-2 border rounded-xl"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-4 py-2 rounded-2xl w-full"
          >
            Send Message
          </motion.button>
        </motion.form>
      </Section>

      {/* Footer */}
      <footer className="text-center p-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Animated Single Page App
      </footer>
    </div>
  );
}

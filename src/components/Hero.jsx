"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 pt-20"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="text-green-600" size={24} />
            <span className="text-green-700 dark:text-green-400 font-medium">
              Sustainable Living
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Better.
            <br />
            <span className="text-green-700 dark:text-green-400">
              Live Greener.
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Explore eco-friendly alternatives for daily life.
          </p>

          <div className="flex gap-4">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-green-700 text-white rounded-full font-medium hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              Shop Now
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-green-700 text-green-700 dark:text-green-400 dark:border-green-400 rounded-full font-medium hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="w-full h-96 bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-900 dark:to-emerald-800 rounded-3xl flex items-center justify-center">
            <Sparkles size={120} className="text-green-700 dark:text-green-300 opacity-50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

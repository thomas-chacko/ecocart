"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 pt-20"
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
            <span className="text-green-700 font-medium">
              Sustainable Living
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Eco Care for
            <br />
            <span className="text-green-700">
              Everyday Life
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Discover eco-friendly products that make a difference. Join the green revolution and shop with purpose for a better tomorrow.
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
              className="px-8 py-3 border-2 border-green-700 text-green-700 rounded-full font-medium hover:bg-green-50 transition-colors"
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
          <div className="w-full h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-3xl flex items-center justify-center">
            <Sparkles size={120} className="text-green-700 opacity-50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

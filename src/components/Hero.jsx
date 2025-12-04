"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import bannerImage from "../../public/images/bannerImage.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-white pt-20"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Sustainable Living, Simplified.
            </h1>

            <p className="text-xl max-w-[600px] text-gray-600 mb-8 leading-relaxed">
              Discover EcoCart's range of eco-friendly products designed for a
              better planet and a brighter future. Make a positive impact with
              every choice.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-green text-white rounded-full font-medium hover:bg-primary-green/90 transition-colors flex items-center gap-2 shadow-lg"
              >
                Shop Now
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary-green text-primary-green rounded-full font-medium hover:bg-green-50 transition-colors"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={bannerImage}
                alt="Eco-friendly products"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

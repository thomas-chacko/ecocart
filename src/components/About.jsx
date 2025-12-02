"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Recycle, Heart } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Products made from renewable, biodegradable materials",
    },
    {
      icon: Recycle,
      title: "Zero-Waste Lifestyle",
      description: "Reduce plastic waste and embrace circular economy",
    },
    {
      icon: Heart,
      title: "Eco-Friendly Benefits",
      description: "Better for you, better for the planet",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We believe in making sustainable choices accessible and beautiful
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 bg-green-50 dark:bg-gray-800 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <feature.icon className="text-green-700 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Recycle, RefreshCw, PawPrint } from "lucide-react";

export default function WhyEcoCart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Products designed with the planet in mind, minimizing environmental impact.",
    },
    {
      icon: Recycle,
      title: "Biodegradable",
      description: "Items that naturally decompose, returning to the earth without harm.",
    },
    {
      icon: RefreshCw,
      title: "Sustainable Materials",
      description: "Crafted from renewable and responsibly sourced resources.",
    },
    {
      icon: PawPrint,
      title: "Cruelty-Free",
      description: "Our commitment to ethical practices means no animal testing, ever.",
    },
  ];

  return (
    <section
      id="why-ecocart"
      ref={ref}
      className="py-24 bg-primary-gray"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose EcoCart?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-8 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 border border-gray-50/50"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                <reason.icon className="text-green-500" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

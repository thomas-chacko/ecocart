"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Globe, Shield, Clock } from "lucide-react";

export default function WhyEcoCart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Leaf,
      title: "Biodegradable Materials",
      description: "All products naturally decompose without harming the environment",
    },
    {
      icon: Globe,
      title: "Better for the Planet",
      description: "Reduce your carbon footprint with every purchase",
    },
    {
      icon: Clock,
      title: "Durable & Long-lasting",
      description: "Quality products that stand the test of time",
    },
    {
      icon: Shield,
      title: "Safe for Daily Use",
      description: "Non-toxic, chemical-free products for your family",
    },
  ];

  return (
    <section
      id="why-ecocart"
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose EcoCart?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making a difference, one product at a time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex p-6 bg-green-100 rounded-full mb-4"
              >
                <reason.icon className="text-green-700" size={40} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

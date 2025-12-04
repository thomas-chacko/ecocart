"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      number: "12K+",
      label: "Plastic Saved",
    },
    {
      number: "95%",
      label: "Recycled Packaging",
    },
    {
      number: "100%",
      label: "Cruelty-Free",
    },
    {
      number: "20+",
      label: "Ethical Partners",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="container px-6 mx-auto lg:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            About EcoCart
          </h2>
        </motion.div>

        {/* Main Content: Text + Image */}
        <div className="grid gap-12 items-center lg:grid-cols-2">
          {/* Left: Mission & Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-4 text-3xl font-semibold leading-snug text-gray-900 md:text-4xl">
                Our Mission: Nurturing a Greener Tomorrow
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                At EcoCart, we believe that small changes can lead to
                significant impact. Our mission is to provide thoughtfully
                sourced, high-quality, and genuinely sustainable products that
                make eco-conscious living accessible and enjoyable for everyone.
                We're committed to transparency, ethical practices, and
                fostering a community that values our planet.
              </p>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-y-8 gap-x-10 pt-6 max-w-md"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-3xl font-bold text-green-600 md:text-4xl">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/images/about.jpg"
                alt="Hands holding a green earth surrounded by leaves"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

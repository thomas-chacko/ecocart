"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      name: "Bamboo Comb",
      description: "Handcrafted bamboo comb for smooth, tangle-free hair",
      price: "12.99",
      emoji: "🪮",
    },
    {
      name: "Bamboo Toothbrush",
      description: "Biodegradable bamboo toothbrush with soft bristles",
      price: "8.99",
      emoji: "🪥",
    },
    {
      name: "Natural Bath Sponge",
      description: "100% natural loofah sponge for gentle exfoliation",
      price: "6.99",
      emoji: "🧽",
    },
    {
      name: "Reusable Cotton Pads",
      description: "Soft, washable cotton pads for makeup removal",
      price: "14.99",
      emoji: "🧴",
    },
    {
      name: "Bamboo Cutlery Set",
      description: "Portable eco-friendly utensils for on-the-go",
      price: "18.99",
      emoji: "🍴",
    },
    {
      name: "Beeswax Food Wraps",
      description: "Reusable alternative to plastic wrap",
      price: "16.99",
      emoji: "🐝",
    },
  ];

  return (
    <section
      id="products"
      ref={ref}
      className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of sustainable essentials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

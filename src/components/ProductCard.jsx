"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {product.name}
        </h3>

        <p className="text-2xl font-bold text-primary-green mb-4">
          ₹{product.price}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-primary-green text-white rounded-lg font-medium hover:bg-primary-green/90 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

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

      <div className="p-4 sm:p-6 text-center">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
          {product.name}
        </h3>

        <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-green mb-3 sm:mb-4">
          ₹{product.price}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <Link
            href={`/products/${product._id}`}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors"
          >
            View Details
          </Link>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-green text-white rounded-lg text-sm sm:text-base font-medium hover:bg-primary-green/90 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

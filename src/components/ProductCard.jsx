"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
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
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary-green transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto pt-4">
          <p className="text-2xl font-bold text-primary-green mb-4">
            ₹{product.price}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/products/${product._id}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all active:scale-95 border border-gray-200"
            >
              <Eye size={18} />
              Details
            </Link>

            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-green text-white rounded-xl text-sm font-semibold hover:bg-primary-green/90 transition-all shadow-md shadow-green-200 active:scale-95"
            >
              <ShoppingCart size={18} />
              Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

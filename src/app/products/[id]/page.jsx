"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    getId();
  }, [params]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => router.push("/")}
            className="text-primary-green hover:underline"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <CartSidebar />
      <div className="min-h-screen bg-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <motion.button
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-green mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </motion.button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-2xl md:text-3xl font-bold text-primary-green mb-6">
                ₹{product.price}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.category && (
                <div className="mb-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Category
                  </h3>
                  <span className="inline-block px-4 py-2 bg-green-100 text-primary-green rounded-full font-medium text-sm">
                    {product.category}
                  </span>
                </div>
              )}

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 px-8 py-3 bg-primary-green text-white rounded-lg text-base font-medium hover:bg-primary-green/90 transition-colors flex items-center justify-center gap-3 shadow-lg"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

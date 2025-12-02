"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Leaf, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = ["Home", "About", "Products", "Why EcoCart", "Contact"];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm"
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-700 dark:text-green-500" size={28} />
            <span className="text-2xl font-bold text-green-800 dark:text-green-400">
              EcoCart
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Theme Toggle - Modern Toggle Switch */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="hidden md:block p-1 rounded-full bg-green-100 dark:bg-gray-700 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                <motion.div className="w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full relative flex items-center px-1">
                  <motion.div
                    className="absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                    initial={false}
                    animate={{
                      x: resolvedTheme === "dark" ? 28 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      {resolvedTheme === "dark" ? (
                        <Sun size={14} className="text-yellow-500" />
                      ) : (
                        <Moon size={14} className="text-gray-700" />
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] right-0 w-full h-[calc(100vh-72px)] bg-white dark:bg-gray-900 z-40 md:hidden"
          >
            <ul className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    onClick={handleLinkClick}
                    className="text-2xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}

              {/* Mobile Theme Toggle - Modern Card Style */}
              {mounted && (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-8"
                >
                  <motion.button
                    onClick={toggleTheme}
                    className="relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 shadow-lg overflow-hidden"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle theme"
                  >
                    {/* Icon Container */}
                    <motion.div
                      className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-md"
                      initial={false}
                      animate={{
                        rotate: resolvedTheme === "dark" ? 360 : 0,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 0.6, type: "spring" },
                        scale: { duration: 0.3 },
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {resolvedTheme === "dark" ? (
                          <motion.div
                            key="sun"
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: 180, scale: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Sun size={24} className="text-yellow-500" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="moon"
                            initial={{ rotate: 180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: -180, scale: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Moon size={24} className="text-gray-700" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Text and Toggle */}
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                      </span>

                      {/* Toggle Switch */}
                      <div className="w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full relative shadow-inner">
                        <motion.div
                          className="absolute top-1 w-5 h-5 bg-green-600 dark:bg-green-400 rounded-full shadow-lg"
                          initial={false}
                          animate={{
                            x: resolvedTheme === "dark" ? 28 : 4,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </div>
                    </div>
                  </motion.button>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

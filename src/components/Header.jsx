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
            {/* Desktop Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="hidden md:block p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-700 dark:text-gray-400" />
                )}
              </button>
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

              {/* Mobile Theme Toggle */}
              {mounted && (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-4"
                >
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-8 py-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {resolvedTheme === "dark" ? (
                      <>
                        <Sun size={24} className="text-yellow-500" />
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          Light Mode
                        </span>
                      </>
                    ) : (
                      <>
                        <Moon size={24} className="text-gray-700 dark:text-gray-400" />
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          Dark Mode
                        </span>
                      </>
                    )}
                  </button>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

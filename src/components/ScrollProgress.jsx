"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-green/80 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Glow effect */}
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-green origin-left z-[99] blur-sm opacity-60"
        style={{ scaleX }}
      /> */}
    </>
  );
}

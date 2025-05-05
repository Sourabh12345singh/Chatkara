"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [randomColors, setRandomColors] = useState([
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-primary/80",
    "bg-secondary/80",
    "bg-accent/80",
    "bg-primary/60",
    "bg-secondary/60",
    "bg-accent/60",
  ]);

  // Shuffle colors on component mount
  useEffect(() => {
    const shuffled = [...randomColors].sort(() => 0.5 - Math.random());
    setRandomColors(shuffled);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 overflow-hidden relative">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-primary/30"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-md text-center z-10">
        <motion.div
          className="grid grid-cols-3 gap-3 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {randomColors.length > 0 &&
            [...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className={`aspect-square rounded-2xl ${randomColors[i % randomColors.length]} cursor-pointer relative`}
                whileHover={{
                  scale: 1.1,
                  rotate: Math.random() * 10 - 5,
                  zIndex: 10,
                }}
                animate={{
                  scale: i % 2 === 0 ? [1, 1.05, 1] : 1,
                  rotate: i % 3 === 0 ? [0, 2, 0, -2, 0] : 0,
                }}
                transition={{
                  duration: i % 2 === 0 ? 2 : 0,
                  repeat: i % 2 === 0 ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === i && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {i + 1}
                  </motion.div>
                )}

                {/* Particles that appear on hover */}
                {hoveredIndex === i && (
                  <>
                    {[...Array(8)].map((_, j) => (
                      <motion.div
                        key={`particle-${j}`}
                        className="absolute w-2 h-2 rounded-full bg-white"
                        initial={{
                          x: "50%",
                          y: "50%",
                          opacity: 1,
                        }}
                        animate={{
                          x: `${Math.random() * 200 - 100}%`,
                          y: `${Math.random() * 200 - 100}%`,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            ))}
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-base-content/60"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

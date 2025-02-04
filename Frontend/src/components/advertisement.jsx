import React from "react";
import { motion } from "framer-motion";

function Advertisement() {
  return (
    <div className="w-full flex justify-center">
      <motion.div
        className="bg-yellow-300 text-black font-bold text-xl px-6 py-3 rounded-lg shadow-lg border-2 border-yellow-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        📢 Advertisement
      </motion.div>
    </div>
  );
}

export default Advertisement;

"use client";
import { motion } from "framer-motion";
export default function CardDesign(props: any) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        <div className="m-4 p-4 border border-blue-500 rounded-md shadow-md bg-blue-400">
          <h1 className="text-2xl font-bold">{props.title}</h1>
        </div>
      </motion.div>
    </div>
  );
}

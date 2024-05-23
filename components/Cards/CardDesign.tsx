"use client";
import { motion } from "framer-motion";
import { GiArabicDoor } from "react-icons/gi";

export default function CardDesign(props: any) {
  return (
    <div className=" px-4 py-12">
      <ShimmyCard title={props.title} description={props.description} />
    </div>
  );
}

const ShimmyCard = (props: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50"
    >
      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] bg-slate-900 p-8 transition-colors duration-500 group-hover:bg-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <GiArabicDoor className="relative z-10 mb-10 mt-2 rounded-full border-2 border-blue-500 bg-slate-900 p-4 text-7xl text-blue-500" />
        </motion.div>

        <motion.h4
          initial={{ opacity: 0, x: -1000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          className="relative z-10 mb-4 w-full text-3xl font-bold text-slate-50"
        >
          {props.title}
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          className="relative z-10 text-slate-400"
        >
          {props.description}
        </motion.p>
      </div>

      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  );
};

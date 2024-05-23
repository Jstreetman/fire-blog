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
      transition={{ duration: 1.3, ease: "easeInOut" }}
      className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50"
    >
      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] bg-slate-900 p-8 transition-colors duration-500 group-hover:bg-slate-800">
        <GiArabicDoor className="relative z-10 mb-10 mt-2 rounded-full border-2 border-blue-500 bg-slate-900 p-4 text-7xl text-blue-500" />

        <h4 className="relative z-10 mb-4 w-full text-3xl font-bold text-slate-50">
          {props.title}
        </h4>
        <p className="relative z-10 text-slate-400">{props.description}</p>
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

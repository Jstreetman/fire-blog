"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { signOutWithGoogle } from "@/app/firebase/auth/authsignin";
import { useRouter } from "next/navigation";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";
import { usePathname } from "next/navigation";

const FeedNavbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <FlipNav />
      <div className="h-30" />
    </motion.div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" glass-nav p-4  border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur flex items-center justify-between relative">
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <div>
      <Link href="/feed">
        <FaFire className="h-7 w-7 text-blue-400" />
      </Link>
    </div>
  );
};

const NavLeft = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-white text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
    </div>
  );
};

const NavLink = ({ text }: { text: string }) => {
  return (
    <Link
      href="#"
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-blue-600">{text}</span>
      </motion.div>
    </Link>
  );
};

const NavRight = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const uid = user?.uid;
  const pathname = usePathname();

  const isProfileRoute = pathname === `/profile/${uid}`;

  const handleSignOut = async () => {
    await signOutWithGoogle();
    router.push("/signin");
  };
  return (
    <div className="flex items-center gap-4">
      <NavLink text="Notifications" />

      {!isProfileRoute && (
        <Link
          href={`/profile/${uid}`}
          className="px-4 py-2 scale-100 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
        >
          Profile
        </Link>
      )}

      <button
        onClick={handleSignOut}
        className="rounded-lg scale-100 bg-gradient-to-br from-blue-600 from-40% to-blue-400 px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95"
      >
        Sign Out
      </button>
    </div>
  );
};

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 glass-nav  bg-gradient-to-br from-white/20 to-white/5 backdrop-blur left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink text="Notifications" />
    </motion.div>
  );
};

const MenuLink = ({ text }: { text: string }) => {
  return (
    <motion.div
      variants={menuLinkVariants}
      rel="nofollow"
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-white" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <Link href="#">
          <span className="flex items-center h-[30px] text-gray-500">
            {text}
          </span>
          <span className="flex items-center h-[30px] text-blue-600">
            {text}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FeedNavbar;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};

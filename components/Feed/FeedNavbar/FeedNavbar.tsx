"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import appLogo from "../../../public/assets/images/applogo.svg";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-queries/queries";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
const FeedNavbar = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) router.push("/feed");
  }, [isSuccess]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.25, ease: "easeInOut", delay: 0.5 }}
      className="topbar glass-nav bg-gradient-to-br from-white/20 to-white/5 backdrop-blur ">
      <div className="flex-between py-4 px-5">
        <Link href="/feed" className="flex gap-3 items-center">
          <Image src={appLogo} alt="logo" width={24} height={24} />
        </Link>

        <div className="flex gap-4">
          <Button
            className="rounded-lg scale-100  px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95"
            onClick={() => signOut()}>
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </Button>
          <Link href={`/profile/${user.id}`} className="flex-center gap-3">
            <Image
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              width={36}
              height={36}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default FeedNavbar;

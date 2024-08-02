"use client";
import { NavLink } from "@/app/types";
import { useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-queries/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import LoadingAnimation from "../Animations/LoadingAnimation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const FeedSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);

    router.push("/signin");
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
      className="leftsidebar  bg-gradient-to-br from-white/20 to-white/5 backdrop-blur   ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        className="flex flex-col gap-11 h-full">
        <Link href="/feed" className="flex gap-3 justify-start items-center">
          <img
            src="/assets/images/applogo.svg"
            alt="logo"
            width={36}
            height={36}
          />
          <p className="body-bold">FireBlog</p>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <LoadingAnimation />
          </div>
        ) : (
          <Link
            href={`/profile/${user.id}`}
            className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-blue-300">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: NavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-blue-500"
                }`}>
                <Link
                  // key={link.route}
                  href={link.route}
                  className="flex gap-4 items-center p-5">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    width={24}
                    height={24}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}>
        <Image
          src="/assets/icons/logout.svg"
          alt="logout"
          width={24}
          height={24}
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </motion.nav>
  );
};

export default FeedSideBar;

"use client";
import { useUserContext } from "@/context/AuthContext";
import { usePathname, useParams } from "next/navigation";
import { useGetUserById } from "@/lib/react-queries/queries";
import PostList from "./PostList";
import LoadingAnimation from "../Animations/LoadingAnimation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-blue-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();

  const { data: currentUser } = useGetUserById(id || "");
  console.log(id, "uid");

  console.log(currentUser?.$id, "user");
  console.log("user posts from loggedin user", currentUser?.posts);
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full z-20">
        <LoadingAnimation />
      </div>
    );

  return (
    <div className="profile-container z-20">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <motion.img
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "anticipate" }}
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <motion.h1
                initial={{ opacity: 0, y: -1000 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.25, ease: "anticipate" }}
                className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 1000 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: "anticipate" }}
                className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.55, ease: "anticipate" }}
              className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
              className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </motion.p>
          </div>

          <div className="flex justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
              className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                href={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <Image
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
              className={`${user.id === id && "hidden"}`}>
              <Button
                type="button"
                className="rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70">
                Follow
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "anticipate" }}>
        <PostList posts={currentUser.posts} showUser={false} />
      </motion.div>
    </div>
  );
};

export default Profile;

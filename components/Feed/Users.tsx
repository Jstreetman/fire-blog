"use client";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-queries/queries";
import LoadingAnimation from "../Animations/LoadingAnimation";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

const Users = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <LoadingAnimation />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default Users;

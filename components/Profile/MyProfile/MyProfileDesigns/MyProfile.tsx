import { FeedPostCard } from "@/components/Feed/FeedPostCard/FeedPostCard";
import { MyProfileDesignDetails } from "./MyProfileDesignDetails";

export const MyProfile = () => {
  return (
    <div className="">
      <MyProfileDesignDetails />
      <FeedPostCard />
      {/* Todo: add profile post component 
      where user post are rendered here */}
    </div>
  );
};

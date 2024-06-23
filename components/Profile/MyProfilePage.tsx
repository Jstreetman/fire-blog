import FeedNavbar from "../Feed/FeedNavbar/FeedNavbar";
import { FeedPostCardDetails } from "../Feed/FeedPostCard/FeedPostCardDetails";
import { FeedPostDetails } from "../Feed/Post/FeedPostDetails";
import { MyProfileDetails } from "./MyProfile/MyProfileDetails";

export const MyProfilePage = () => {
  return (
    <div className="py-16">
      <FeedNavbar />
      <MyProfileDetails />
      <FeedPostDetails />
    </div>
  );
};

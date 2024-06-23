import FeedNavbar from "../Feed/FeedNavbar/FeedNavbar";
import { MyProfileDetails } from "./MyProfile/MyProfileDetails";

export const MyProfilePage = () => {
  return (
    <div className="py-16">
      <FeedNavbar />
      <MyProfileDetails />
    </div>
  );
};

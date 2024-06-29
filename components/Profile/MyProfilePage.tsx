import FeedNavbar from "../Feed/FeedNavbar/FeedNavbar";
import { FeedPostCardDetails } from "../Feed/FeedPostCard/FeedPostCardDetails";
import { FeedPostDetails } from "../Feed/Post/FeedPostDetails";
import { MyProfileDetails } from "./MyProfile/MyProfileDetails";

export const MyProfilePage = ({ params }: { params: { slug: string } }) => {
  console.log("paramsprofile", params.slug);
  return (
    <div className="py-16">
      <FeedNavbar />
      <MyProfileDetails params={params} />
      {/* <FeedPostDetails /> */}
    </div>
  );
};

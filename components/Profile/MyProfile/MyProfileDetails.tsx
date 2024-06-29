import { MyProfile } from "./MyProfileDesigns/MyProfile";

export const MyProfileDetails = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <MyProfile params={params} />
    </div>
  );
};

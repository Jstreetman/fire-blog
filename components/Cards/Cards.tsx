import CardDesign from "./CardDesign";
import CardInfo from "../../props/card/cardinfo";

export const Cards = () => {
  return (
    <div>
      <CardDesign title={CardInfo.title} />
    </div>
  );
};

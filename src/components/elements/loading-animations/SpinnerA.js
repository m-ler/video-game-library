import { ColorRing } from "react-loader-spinner";

const SpinnerA = () => {
  return (
    <div className="flex justify-center w-full border-t-[1px] border-neu1-2 dark:border-neu1-9 py-[15px]">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        wrapperClass="blocks-wrapper"
        colors={["#0F74E7", "#00CDDB", "#FF74AD", "#0F74E7", "#FF74AD"]}
      />
    </div>
  );
};

export default SpinnerA;

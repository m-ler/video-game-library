import { ColorRing } from "react-loader-spinner";

const SpinnerC = props => {
  return (
    <ColorRing
      visible={true}
      height={props.height}
      width={props.width}
      ariaLabel="blocks-loading"
      wrapperClass={props.className}
      colors={["#F095B4", "#F095B4", "#F095B4", "#00CDDB", "#00CDDB"]}
    />
  );
};

export default SpinnerC;

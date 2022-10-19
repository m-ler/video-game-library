import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";

const SpinnerB = props => {
  const theme = useSelector(state => state.theme);
  return (
    <div {...props}>
      <TailSpin
        height="40"
        width="40"
        color={theme === "dark" ? "#616E7C" : "#9AA5B1"}
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default SpinnerB;

import ManTrashBin from "../../assets/svgr/illustration/ManTrashBin";
import DeleteAccountForm from "./DeleteAccountForm";


const DeleteAccountPage = () => {
  return (
    <div className="w-full p-[20px] flex flex-col gap-[25px] h-full m-auto sm:mt-0 duration-200 overflow-auto max-h-full">
      <ManTrashBin className="mx-auto mt-auto sm:mt-0 w-[min(100%,450px)] min-h-[150px] animate-[hueShift_3s_linear_infinite_alternate] text-accent3"></ManTrashBin>

      <div className="w-[min(100%,450px)] mx-auto mb-auto flex flex-col gap-y-[30px]">
        <h1 className="text-[36px] text-neu1-8 dark:text-neu1-2 font-system font-bold leading-[26px]">Delete account</h1>
        <DeleteAccountForm></DeleteAccountForm>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
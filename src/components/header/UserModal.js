import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";
import deleteUser from "../../firebase/auth/deleteUser";
import signOut from "../../firebase/auth/signOut";
import { useRef } from "react";
import uploadFile from "../../firebase/storage/uploadFile";
import { toast } from "react-toastify";
import updateUserProfile from "../../firebase/auth/updateUserProfile";
import UserAvatarButton from "../users/UserAvatarButton";

const menuOptionStyle =
  "block rounded-md font-Raleway font-semibold text-[14px] whitespace-nowrap py-[10px] px-[15px] hover:underline hover:bg-neu1-2 dark:hover:bg-neu1-8";

const UserModal = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.firebase.currentUser);

  const avatarInputRef = useRef();

  const avatarButtonOnClick = e => !!avatarInputRef.current && avatarInputRef.current.click();

  const avatarInputOnChange = async () => {
    if (!avatarInputRef.current?.files[0]) return;
    const file = avatarInputRef.current.files[0];
    const validSize = file.size <= 1024 * 1024 * 1;

    if (!validSize) {
      toast.error("Image size has to be 1MB or less.");
      return;
    }

    const fileExtension = file.type.split("/")[1];
    const imagePath = `users/avatars/${currentUser?.displayName}/avatar.${fileExtension}`;
    const [uploadedFile, error] = await uploadFile(file, imagePath);

    if (error) {
      toast.error("There was an error uploading the image. Please try again.");
      return;
    }

    const fileStorageURL = `https://firebasestorage.googleapis.com/v0/b/${uploadedFile.metadata.bucket}/o/${encodeURIComponent(
      uploadedFile.metadata.fullPath
    )}?alt=media`;

    await updateUserProfile({ photoURL: fileStorageURL });
    !!uploadedFile && toast.success("Avatar updated successfully.");
  };

  const signUserOut = async () => {
    const signedOut = await signOut();
    signedOut && navigate("/login");
  };

  return (
    <div
      className={`bg-neu1-1 dark:bg-neu1-9 border border-neu1-3 dark:border-neu1-7 rounded-md shadow-lg p-[15px] flex flex-col w-fit duration-200 w-[300px] max-w-full animate-[appear1_.1s]`}
    >
      <div className="flex gap-x-[10px] items-center mb-[15px] border-b dark:border-b-neu1-7 pb-[15px]">
        <Tooltip title="Upload image" trigger="mouseenter" delay={0} size="small" theme="transparent" className="max-h-[38px]">
          <UserAvatarButton onClick={avatarButtonOnClick}></UserAvatarButton>
        </Tooltip>

        <div>
          <span className="block text-neu1-8 dark:text-neu1-2 font-bold font-System text-[16px] break-all">{currentUser.displayName}</span>
          <span className="block text-neu1-4 dark:text-neu1-5 font-normal font-System text-[12px] break-all">{currentUser.email}</span>
        </div>
      </div>

      <input type="file" className="hidden" onChange={avatarInputOnChange} ref={avatarInputRef} accept=".png, .jpg, .jpeg"></input>

      <div className="flex flex-wrap gap-x-[15px] justify-between gap-y-[10px]">
        <Link
          to="/delete-account"
          className={`text-[12px] text-neu1-4 dark:text-neu1-5 hover:text-error  dark:hover:text-error inline-block flex items-center`}
        >
          Delete account
        </Link>

        <button className={`${menuOptionStyle} text-neu1-6 dark:text-neu1-3 ml-auto`} onClick={signUserOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserModal;

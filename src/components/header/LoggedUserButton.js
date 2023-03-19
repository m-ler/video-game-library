import Popup from 'reactjs-popup';
import UserAvatarButton from '../user/UserAvatarButton';
import UserModal from '../user/UserModal';

const LoggedUserButton = () => {
	const button = (
		<div>
			<UserAvatarButton></UserAvatarButton>
		</div>
	);

	return (
		<div className="relative">
			<Popup trigger={button} closeOnDocumentClick closeOnEscape={true} modal lockScroll={true} className="bg-accent2">
				<UserModal></UserModal>
			</Popup>
		</div>
	);
};

export default LoggedUserButton;

import { Tooltip } from 'react-tippy';
import { MdOutlineCloudDone, MdOutlineCloudOff } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDoRequest } from './../../features/request/requestSlice';

const APIButton = () => {
    const doRequestsState = useSelector(state =>  state.request);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(toggleDoRequest(!doRequestsState));
    };

    return (
        <Tooltip title={doRequestsState ? 'Disable requests' : 'Enable requests'} trigger='mouseenter' delay={200} size='small' theme='transparent'>
            <button className={`${doRequestsState ? 'bg-accent2' : 'bg-white'} ${doRequestsState ? 'darK:bg-accent2' : 'dark:bg-neu2-8'} p-2 rounded-full hover:brightness-125 transition duration-300`} onClick={handleOnClick}>
                <MdOutlineCloudDone size={'1.3rem'} className={`text-neu2-8 dark:text-neu2-1 ${doRequestsState ? '' : 'hidden'}`}></MdOutlineCloudDone>
                <MdOutlineCloudOff size={'1.3rem'} className={`text-neu2-8 dark:text-neu2-1 ${doRequestsState ? 'hidden' : ''}`}></MdOutlineCloudOff>
            </button>
        </Tooltip>
    )
};

export default APIButton;
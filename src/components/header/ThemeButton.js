import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../features/theme/themeSlice';
import { Tooltip } from 'react-tippy';

const ThemeButton = (props) => {
    const themeState = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const handleOnClick = e => {
        dispatch(changeTheme(themeState === "dark" ? "light" : "dark"));
    };

    return (
        <Tooltip title='Toggle theme' trigger='mouseenter' delay={200} size='small' theme='transparent' className={props.className}>
            <button className={`bg-accent2 dark:bg-d-ter p-2 rounded-full hover:brightness-125 transition duration-300`} onClick={handleOnClick}>
                <MdOutlineDarkMode size={'1.3rem'} className={`text-white dark:text-d-on-ter ${themeState == 'dark' ? 'hidden' : ''}`}></MdOutlineDarkMode>
                <MdOutlineLightMode size={'1.3rem'} className={`text-white dark:text-d-on-ter ${themeState == 'light' ? 'hidden' : ''}`}></MdOutlineLightMode>
            </button>
        </Tooltip>
    )

};

export default ThemeButton;
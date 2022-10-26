import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../features/theme/themeSlice';
import { Tooltip } from 'react-tippy';

const ThemeButton = () => {
    const themeState = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const handleOnClick = e => {
        dispatch(toggleTheme(themeState === "dark" ? "light" : "dark"));
    };

    return (
        <Tooltip title='Toggle theme' trigger='mouseenter' delay={100} size='small' theme='transparent'>
            <button className={`bg-accent1 dark:bg-d-ter p-[8px] rounded-full hover:brightness-125 transition duration-300`} onClick={handleOnClick}>
                <MdOutlineDarkMode size={'22px'} className={`text-white dark:text-d-on-ter ${themeState == 'dark' ? 'hidden' : ''}`}></MdOutlineDarkMode>
                <MdOutlineLightMode size={'22px'} className={`text-white dark:text-d-on-ter ${themeState == 'light' ? 'hidden' : ''}`}></MdOutlineLightMode>
            </button>
        </Tooltip>
    ) 

};

export default ThemeButton;
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../features/theme/themeSlice';

const ThemeButton = (props) => {
    const themeState = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const handleOnClick = e => {
        dispatch(changeTheme(themeState === "dark" ? "light" : "dark"));
    };



    return (
        <button className={`bg-l-ter dark:bg-d-ter p-2 rounded-full  ${props.className}`} title='Toggle theme' onClick={handleOnClick}>
            <MdOutlineDarkMode size={'1.3rem'} className={`text-l-on-ter dark:text-d-on-ter ${themeState == 'dark' ? 'hidden' : ''}`}></MdOutlineDarkMode>
            <MdOutlineLightMode size={'1.3rem'} className={`text-l-on-ter dark:text-d-on-ter ${themeState == 'light' ? 'hidden' : ''}`}></MdOutlineLightMode>
        </button>
    )

};

export default ThemeButton;
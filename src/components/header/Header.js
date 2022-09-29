import { ReactComponent as Logo } from './../../assets/logo.svg';

import ThemeButton from './ThemeButton';
import APIButton from './APIButton';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <header className='flex items-center gap-x-[25px] px-[20px] py-[20px] max-w-[1920px] mx-auto flex-wrap gap-y-[15px] w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <Link to='/'>
                    <Logo className='min-w-[58px] w-8 h-9 fill-neu1-10 dark:fill-neu1-1'></Logo>
                </Link>
            </div>
            <div className='flex gap-x-[10px] grow'>
                <SearchBar></SearchBar>
                <div className='ml-auto flex gap-x-[10px]' >
                    <APIButton></APIButton>
                    <ThemeButton></ThemeButton>
                </div>
            </div>
        </header>
    )

};

export default Header;
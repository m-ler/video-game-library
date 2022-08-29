import { ReactComponent as Logo } from './../../assets/logo.svg';
import { MdSearch } from 'react-icons/md';
import ThemeButton from './ThemeButton';

const Header = () => {

    return (
        <header className='flex items-center gap-x-[25px] bg-l-sec-c dark:bg-d-sec-c px-[40px] py-[20px] max-w-[1920px] mx-auto flex-wrap gap-y-[15px] w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <Logo className='min-w-[2rem] w-8 h-9 text-l-on-bg dark:text-d-on-bg'></Logo>
                <h1 className='text-text2 dark:text-text2-dark font-Poppins font-bold uppercase text-[18px]'>Video Games Book</h1>
            </div>
            <div className='flex gap-x-[10px] grow'>
                <div className='bg-white/50 dark:bg-black/30 drop-shadow-md p-2.5 h-9 gap-x-2.5 rounded-full flex items-center px-5  max-w-[400px] grow'>
                    <MdSearch size={'24px'} className='text-text3 dark:text-text2-dark '></MdSearch>
                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-transparent outline-0 text-text1 dark:text-text1-dark text-sm placeholder:text-l-on-sec-c/40 dark:placeholder:text-d-on-sec-c/40 w-full font-OpenSans font-semibold'
                        autoComplete='off'
                        spellCheck='false'>
                    </input>
                </div>
                <ThemeButton className='ml-auto'></ThemeButton>
            </div>
        </header>
    )

};

export default Header;
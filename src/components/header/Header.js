import { ReactComponent as Logo } from './../../assets/logo.svg';
import { MdSearch } from 'react-icons/md';
import ThemeButton from './ThemeButton';

const Header = () => {

    return (
        <header className='flex items-center gap-x-2.5 h-16 bg-l-surface dark:bg-d-surface px-4 py-3'>
            <Logo className='min-w-[2rem] w-8 h-9 text-l-on-bg dark:text-d-on-bg'></Logo>
            <div className='bg-l-sec-c dark:bg-d-sec-c p-2.5 h-9 gap-x-2.5 rounded-full flex items-center px-5 grow max-w-[400px]'>
                <MdSearch size={'1.25rem'} className='text-l-on-sec-c dark:text-d-on-sec-c '></MdSearch>
                <input
                    type='text'
                    placeholder='Search'
                    className='bg-transparent outline-0 text-l-on-sec-c dark:text-d-on-sec-c text-sm placeholder:text-l-on-sec-c/40 dark:placeholder:text-d-on-sec-c/40 w-full'
                    autoComplete='off'
                    spellCheck='false'>
                </input>
            </div>
            <ThemeButton className='ml-auto'></ThemeButton>
        </header>
    )

};

export default Header;
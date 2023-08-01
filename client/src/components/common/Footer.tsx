import { getCurrentYear } from '../../utils/helper';

const Footer = () => {
    return (
        <footer>
            <div className='px-4 py-5 min-w-full sm:px-6 max-w-6xl'>
                <div className='mt-1 text-sm text-gray-500 text-center'>
                    Jordan Holt{' '}
                    <span className='block sm:inline'>
                        &copy;{getCurrentYear()}
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

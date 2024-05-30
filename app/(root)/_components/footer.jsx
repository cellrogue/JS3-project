import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="flex bg-secondary p-8 justify-center items-center">
             <Link href='/'>
                <Image
                    src='/assets/logo2.webp'
                    alt='logo'
                    width={150}
                    height={60}
                    className='flex rounded-full'
                />
            </Link>
        </div>
    )
};

export default Footer;

import { Title, Link, Image } from '@/components/ui';
import { twMerge } from 'tailwind-merge';

const Logo = ({ alt, href, mode, size }: { alt: string, href: string,size: number, mode: 'dark' | 'white' }) => {
    return <>
        <Link href={href} className={twMerge('flex flex-row items-center justify-center gap-2')}>
            <Image src={`https://res.cloudinary.com/dvxn9nvjs/image/upload/v1680447716/portfolio/logo/${mode == 'dark' ? 'color_double_mode_dark_ya6enh' : 'color_double_mode_light_ryyabn'}.svg`} alt={alt} width={size} height={size}/>
        </Link>
    </>
}

export default Logo;
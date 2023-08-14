import { Title, Link, Image, Button, ButtonProps } from '@/components/ui';
import { twMerge } from 'tailwind-merge';
interface LogoProps extends Omit<ButtonProps, 'size' | 'degree' > {
    alt: string;
    size: number;
    mode: 'dark' | 'white';
}
const Logo = ({ alt, mode, size, ...props }: LogoProps) => {
    return <>
        <Button className={twMerge('flex flex-row items-center justify-center gap-2')} {...props}>
            <Image className='w-10 xxs:w-16' src={`https://res.cloudinary.com/dvxn9nvjs/image/upload/v1680447716/portfolio/logo/${mode == 'dark' ? 'color_double_mode_dark_ya6enh' : 'color_double_mode_light_ryyabn'}.svg`} alt={alt} width={size} height={size}/>
        </Button>
    </>
}

export default Logo;
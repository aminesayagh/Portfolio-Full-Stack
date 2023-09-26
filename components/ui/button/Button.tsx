import { FocusRing } from 'react-aria';
import { Button } from 'react-aria-components'
import { ButtonProps } from './Button.type';
import { twMerge } from 'tailwind-merge';
import { textClassNames } from '@/components/ui/typography';

const ButtonUi = ({ children, icon, iconRight, size = 'auto', full, weight, degree = "0", exchange, className, ...props }: ButtonProps) => {
    return <>
        <FocusRing >
            <Button className={twMerge(
                'touch-none select-none focus:outline-none',
                'gap-2 flex flex-row flex-nowrap self-center items-center justify-center',
                'font-sans font-bold',
                'text-clip whitespace-nowrap overflow-hidden',
                'align-middle cursor-pointer-gsap',
                full && 'w-full',
                textClassNames({ weight, size, degree, exchange }),
                typeof className == 'string' && className,
            )} {...props} >
                {children}
            </Button>
        </FocusRing>
    </>
}

export default ButtonUi;
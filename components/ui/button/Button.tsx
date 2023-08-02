import { FocusRing } from 'react-aria';
import { Button } from 'react-aria-components'
import { ButtonProps } from './Button.type';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';

import { mergeClassName } from '@/helpers/className';


export const buttonStyle = cva(
    [
        'touch-none select-none focus:outline-none',
        'gap-2 flex flex-row flex-nowrap self-center items-center justify-center',
        'font-body font-bold',
        'text-clip whitespace-nowrap overflow-hidden',
        'align-middle',
        'transition-colors ease-in-out duration-200',
        'transition-transform ease-in-out duration-100',
        `touch-none select-none focus:outline-none`
    ],
    {
        variants: {
            size: {
                default: '',
                xl: [''],
                md: [''],
                xs: [''],
            }
        },
        defaultVariants: {
            size: 'default',
        }
    },
)

const ButtonUi = ({ children, icon, iconRight, size, full, className, ...props }: ButtonProps) => {
    return <>
        <FocusRing >
            <Button className={twMerge(
                'touch-none select-none focus:outline-none',
                'gap-2 flex flex-row flex-nowrap self-center items-center justify-center',
                'font-body font-bold',
                'text-clip whitespace-nowrap overflow-hidden',
                'align-middle',
                'transition-colors ease-in-out duration-200',
                'transition-transform ease-in-out duration-100',
                full && 'w-full',
                typeof className == 'string' && className
            )} {...props} >
                {children}
            </Button>
        </FocusRing>
    </>
}

export default ButtonUi;
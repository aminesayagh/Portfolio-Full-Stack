import { FocusRing } from 'react-aria';
import { Button } from 'react-aria-components'
import { ButtonProps } from './Button.type';
import {twMerge} from 'tailwind-merge';
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
            color: {
                neutral: [
                    ''
                ],
                none: '',
            },
            size: {
                default: '',
                xl: [''],
                md: [''],
                xs: [''],
            },
            rounded: {
                full: 'rounded-full',
                default: '',
                none: ''
            },
            shadow: {
                false: '',
                true: '',
            },
        },
        defaultVariants: {
            color: 'neutral',
            size: 'default',
            rounded: 'default',
            shadow: false
        }
    },
)

const ButtonUi = ({ children, icon, iconRight, color, size, rounded, full, className, ...props }: ButtonProps) => {
    return <>
        <FocusRing >
            <Button className={(v) => twMerge(buttonStyle({ color, size, rounded }), full && 'w-full', typeof className == 'function' ? className(v) : className)} {...props}>
                {children}
            </Button>
        </FocusRing>
    </>
}

export default ButtonUi;
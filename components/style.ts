
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';

export const rounded = cva('',{
    variants: {
        size: {
            xl: 'rounded-3xl',
            lg: 'rounded-xl',
            sm: 'rounded-lg',
        }
    },
    defaultVariants: {
        size: 'lg'
    }
});

export const blurCard = cva('border', {
    variants: {
        color: {
            white: ['backdrop-blur-xl', 'border border-white-100/20 bg-white-100/[0.05]'],
            black: ['backdrop-blur-xl', 'border border-black-100/20 bg-black-100/[0.05]'],
        }
    },
    defaultVariants: {
        color: 'white'
    }
})
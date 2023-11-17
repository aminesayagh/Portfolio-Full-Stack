
import { cva } from 'class-variance-authority';

export const rounded = cva('',{
    variants: {
        size: {
            xl: 'rounded-xl xl:rounded-3xl',
            lg: 'rounded-xl',
            sm: 'rounded-lg',
        }
    },
    defaultVariants: {
        size: 'lg'
    }
});
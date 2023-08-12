import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
export interface ContainerProps {
    children: React.ReactNode | React.ReactNode[];
    id?: string;
    size: 'lg' | 'full',
    className?: string;
    as?: 'span' | 'div' | 'section' | 'footer' | 'header';
}

export const containerStyle = cva(['mx-auto w-full max-w-full z-container overflow-x-hidden h-auto  2xl:max-w-[1400px] 3xl:max-w-[1500px] 4xl:max-w-[1600px]'], {
    variants: {
        size: {
            lg: 'px-4 xs:px-5 sm:px-8 lg:px-10',
            full: 'px-2 [&>*]:px-2 [&>*]:xs:px-3 [&>*]:sm:px-6 [&>*]:lg:px-8'
        }
    }
}) 


const Container = ({ as, children, className, ...props }: ContainerProps) => {
    return (
        <>
            {React.createElement(as || 'span', {
                className: twMerge(containerStyle(
                    { size: props.size }
                ), className),
                ...props
            }, children)}
        </>
    )
}

export default Container;
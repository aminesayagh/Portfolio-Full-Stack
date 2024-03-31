import { createElement, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { containerStyle } from './Container.style';

import { ContainerProps } from './Container.type';

const Container = ({ as = 'div', children, className, ...props }: ContainerProps) => {
    const classNames = useMemo(() => twMerge(
        containerStyle(
            { size: props.size }
        ),
        className
    ), [props.size, className]);
    return (
        <>
            {createElement(as, {
                className: classNames,
                ...props
            }, children)}
        </>
    )
}

export default Container;
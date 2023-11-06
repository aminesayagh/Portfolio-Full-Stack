import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { containerStyle } from './Container.style';

import { ContainerProps } from './Container.type';

const Container = ({ as = 'div', children, className, ...props }: ContainerProps) => {
    return (
        <>
            {React.createElement(as, {
                className: twMerge(containerStyle(
                    { size: props.size }
                ), className),
                ...props
            }, children)}
        </>
    )
}

export default Container;
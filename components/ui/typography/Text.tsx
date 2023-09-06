import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { TextNames, TextPropsExtended, validTextElements, TextPropsType } from './Typography.type';
import { textClassNames } from './Typography.style';


const Text: FC<TextPropsExtended> = ({ weight, degree = '3', size, exchange, className, children, ...props }) => {
    const ElementType = (Object.keys(props) as Array<TextNames>).find(prop => validTextElements.includes(prop)) || 'p';
    // @ts-expect-error
    validTextElements.forEach(prop => delete props[prop]);
    return React.createElement(ElementType, {
        className: twMerge(
            textClassNames({ weight, size, degree, exchange }),
            className
        ),
        ...props
    }, children);
}

export default Text;
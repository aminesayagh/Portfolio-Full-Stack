import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import Style from './Typography.module.scss';
import { textColorDegree, titleStyle } from './Typography.style';

import type { TitleNames, TitlePropsExtended, } from './Typography.type';
import { validTitleElements } from './Typography.type'

const Title: FC<TitlePropsExtended> = ({ weight, degree = '1', exchange, className, children, ...props }) => {
    const ElementType = (Object.keys(props) as Array<TitleNames>).find(prop => validTitleElements.includes(prop)) || 'h2';
    // @ts-expect-error
    validTitleElements.forEach(prop => delete props[prop]);
    const classes = twMerge(
        titleStyle({
            weight
        }),
        className,
        Style[`title_${ElementType}`],
        Style['title'],
        textColorDegree[exchange ? 'exchanged' : 'normal'][degree]
    )
    return React.createElement(ElementType, {
        className: classes,
        ...props
    }, children);
}

export default Title;
import React, { FC, useRef, useEffect, useState } from 'react';
import LinkNext from 'next/link';
import { twMerge } from 'tailwind-merge';
import { textColorDegree, displayStyle, textStyle, titleStyle } from './Typography.style'
import { DisplayPropsExtended } from './Typography.type';
import Style from './Typography.module.scss';

import { ReactFitty } from 'react-fitty';
import { ReactFitProps } from './Typography.type';

export const Fit = ({ children, className, exchange, weight, ...props }: ReactFitProps) => {
    // const ref = useRef<HTMLDivElement>(null);
    // const refSpan = useRef<HTMLDivElement>(null);
    // useFLexFont(ref, refSpan);
    return <ReactFitty className={twMerge(
        displayStyle({
            weight
        }),
        'leading-none',
        textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
        className)}>
        {children}
    </ReactFitty>

}
// DISPLAY
export type { DisplayPropsExtended } from './Typography.type';


export const Display: FC<DisplayPropsExtended> = ({ size, weight, exchange, children, className, ...props }) => {
    return React.createElement('h1', {
        className: twMerge(
            displayStyle({
                weight
            }),
            textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
            Style[`display_${size}`],
            Style['display'],
            className,
        ),
        ...props
    }, children)
}

// TITLE
import type { TitleElement, TitleNames, TitlePropsExtended, } from './Typography.type';
import { validTitleElements } from './Typography.type'
export const Title: FC<TitlePropsExtended> = ({ weight, degree = '1', exchange, className, children, ...props }) => {
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

// TEXT
import { TextNames, TextPropsExtended, validTextElements } from './Typography.type';
export type TextPropsType = Pick<TextPropsExtended, 'exchange' | 'size' | 'weight' | 'degree'>;

export const textClassNames = ({ weight, size, degree, exchange }: TextPropsType) => {
    return twMerge(
        textStyle({
            weight
        }),
        Style[`text_${size}`],
        Style['text'],
        textColorDegree[!!exchange ? "exchanged" : "normal"][degree]
    )
}
export const Text: FC<TextPropsExtended> = ({ weight, degree = '3', size, exchange, className, children, ...props }) => {
    const ElementType = (Object.keys(props) as Array<TextNames>).find(prop => validTextElements.includes(prop)) || 'p';
    // @ts-expect-error
    validTextElements.forEach(prop => delete props[prop]);
    return React.createElement(ElementType, {
        className: twMerge(
            textClassNames({ weight, size, degree, exchange }), className
        ),
        ...props
    }, children);
}


// LINK
import { LinkPropsExtended } from './Typography.type';



export const Link: FC<LinkPropsExtended> = ({ weight, degree = '3', size, exchange, className, animation, children, href, ...props }) => {
    const classNameExtended = (size && weight) ? textClassNames({ weight, size, degree, exchange }) : className;
    return <LinkNext href={href} className={twMerge(
        classNameExtended, 'remove_outline', className
    )} {...props}>{children}</LinkNext>
}
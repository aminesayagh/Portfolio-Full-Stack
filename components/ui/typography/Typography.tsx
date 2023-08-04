import React, { FC } from 'react';
import LinkNext from 'next/link';
import { twMerge } from 'tailwind-merge';
import { textColorDegree, displayStyle, textStyle, titleStyle } from './Typography.style'
import { DisplayPropsExtended } from './Typography.type';

// DISPLAY
export type { DisplayPropsExtended } from './Typography.type';
export const Display: FC<DisplayPropsExtended> = ({ size, weight, exchange, children, ...props }) => {
    return React.createElement('h1', {
        className: twMerge(
            displayStyle({
                size, weight
            }),
            textColorDegree[exchange ? 'exchanged' : 'normal']['1']
        ),
        ...props
    }, children)
}

// TITLE
import type { TitleElement, TitleNames, TitlePropsExtended } from './Typography.type';
export const Title: FC<TitlePropsExtended> = ({ weight, degree = '1', exchange, className, children, ...props }) => {
    // @ts-ignore
    const ElementType = (Object.keys(props) as Array<TitleNames>).find(prop => Boolean(props[prop])) || 'h2';
    const classes = twMerge(
        titleStyle({
            as: ElementType,
            weight
        }),
        className,
        textColorDegree[exchange ? 'exchanged' : 'normal'][degree]
    )
    return React.createElement(ElementType, {
        className: classes,
        ...props
    }, children);
}

// TEXT
import { TextNames, TextPropsExtended, validTextElements } from './Typography.type';

export const Text: FC<TextPropsExtended> = ({ weight, degree = '3', size, exchange, className, children, ...props }) => {
    const ElementType = (Object.keys(props) as Array<TextNames>).find(prop => validTextElements.includes(prop)) || 'p';
    // @ts-expect-error
    validTextElements.forEach(prop => delete props[prop]);
    const classes = twMerge(
        textStyle({
            size, weight
        }),
        className,
        textColorDegree[exchange ? 'exchanged' : 'normal'][degree]
    )
    
    return React.createElement(ElementType, {
        className: classes,
        ...props
    }, children);
}


// LINK
import { LinkPropsExtended } from './Typography.type';

export const Link: FC<LinkPropsExtended> = ({ weight,degree = '3', size, exchange, className, children, href, ...props }) => {
    const classes = twMerge(textStyle({
        size, weight
    }), className, 'remove_outline',textColorDegree[exchange ? 'exchanged' : 'normal'][degree]);

    return <LinkNext href={href} className={classes} {...props}>{children}</LinkNext>
}
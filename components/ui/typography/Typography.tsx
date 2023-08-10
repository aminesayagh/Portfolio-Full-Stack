import React, { FC } from 'react';
import LinkNext from 'next/link';
import { twMerge } from 'tailwind-merge';
import { textColorDegree, displayStyle, textStyle, titleStyle } from './Typography.style'
import { DisplayPropsExtended } from './Typography.type';
import Style from './Typography.module.scss';

// DISPLAY
export type { DisplayPropsExtended } from './Typography.type';
export const Display: FC<DisplayPropsExtended> = ({ size, weight, exchange, children, ...props }) => {
    return React.createElement('h1', {
        className: twMerge(
            displayStyle({
                weight
            }),
            textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
            Style[`display_${size}`],
            Style['display']
        ),
        ...props
    }, children)
}

// TITLE
import type { TitleElement, TitleNames, TitlePropsExtended,  } from './Typography.type';
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

export const Text: FC<TextPropsExtended> = ({ weight, degree = '3', size, exchange, className, children, ...props }) => {
    const ElementType = (Object.keys(props) as Array<TextNames>).find(prop => validTextElements.includes(prop)) || 'p';
    // @ts-expect-error
    validTextElements.forEach(prop => delete props[prop]);
    const classes = twMerge(
        textStyle({
            weight
        }),
        Style[`text_${size}`],
        Style['text'],
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
        weight
    }), className, 'remove_outline',textColorDegree[exchange ? 'exchanged' : 'normal'][degree]);

    return <LinkNext href={href} className={classes} {...props}>{children}</LinkNext>
}
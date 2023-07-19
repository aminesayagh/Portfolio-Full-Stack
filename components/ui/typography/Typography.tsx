import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps } from 'class-variance-authority';
import LinkNext, { LinkProps } from 'next/link';

import { titleStyle, titleColorStatus, titleColorDegree, textStyle } from './Typography.style';


// TITLE
import type { TitleElement, TitleNames, TitlePropsExtended } from './Typography.type';
export const Title: React.FC<TitlePropsExtended> = ({ children, weight, transform, degree, status, className, ...props}) => {
    const ElementType = (Object.keys(props) as Array<TitleNames>).find((prop) => Boolean(props[prop])) || 'h1';
    const classes = twMerge(
    );
    return React.createElement(ElementType, {
        className: classes,
        ...props
    }, children);
}

// TEXT
import { TextElement, TextNames, TextPropsExtended } from './Typography.type';
export const Text: React.FC<TextPropsExtended> = ({ weight, transform, degree, status, className, ...props}) => {
    const ElementType = (Object.keys(props) as Array<TextNames>).find((prop) => Boolean(props[prop])) || 'p';
    const classes = twMerge(
    );
    return React.createElement(ElementType, {
        className: classes,
        ...props
    });
}

// LINK
import { LinkPropsExtended } from './Typography.type';
export const Link: React.FC<LinkPropsExtended> = ({ weight, transform, degree, status, className, children, ...props}) => {
    const classes = twMerge(
    );
    return <LinkNext className={classes} {...props}>{children}</LinkNext>;
}
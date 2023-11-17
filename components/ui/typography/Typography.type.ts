import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { LinkProps } from 'next/link';

import { titleStyle, textStyle, displayStyle } from './Typography.style';

type TypeDegree = '0' | '1' | '2' | '3' | '4';
// DISPLAY
export type DisplayPropsExtended = VariantProps<typeof displayStyle> & {
    children: React.ReactNode | string;
    className?: string;
    exchange?: boolean;
    size?: 'xl' | 'lg' | 'md';
    style?: React.CSSProperties;
}

type TitleElement = {
    h1: true
} | {
    h2: true
} | {
    h3: true
} | {
    h4: true
} | {
    h5: true
} | {
    h6: true
}

export const validTitleElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type TitleNames = typeof validTitleElements[number];

export type TitlePropsExtended = TitleElement & VariantProps<typeof titleStyle> & {
    children: React.ReactNode | string;
    className?: string;
    degree: TypeDegree;
    exchange?: boolean;
    style?: React.CSSProperties;
    suppressHydrationWarning?: boolean;
}

export const validTextElements = ['p', 'span', 'small', 'strong', 'em', 'li', 'div'] as const;
export type TextNames = typeof validTextElements[number];

type TextElement = { 
    p: true
} | {
    span: true
} | {
    small: true
} | {
    strong: true
} | {
    em: true
} | {
    li: true
} | {
    div: true
};

type TextSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs' | 'auto';
export type TextPropsType = Pick<TextPropsExtended, 'exchange' | 'size' | 'weight' | 'degree'>;

export type TextPropsExtended = TextElement & VariantProps<typeof textStyle> & {
    children: React.ReactNode | string;
    className?: string;
    degree: '0' | '1' | '2' | '3' | '4';
    size: TextSizes,
    exchange?: boolean;
    style?: React.CSSProperties;
    suppressHydrationWarning?: boolean;
}

export type LinkPropsExtended = LinkProps & VariantProps<typeof textStyle> & {
    children: React.ReactNode | React.ReactNode[] | string;
    className?: string;
    degree?: '0' | '1' | '2' | '3' | '4';
    size?: TextSizes,
    exchange?: boolean;
    animation?: 'animationHover';
}
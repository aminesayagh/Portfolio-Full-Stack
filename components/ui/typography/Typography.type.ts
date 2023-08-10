import { VariantProps } from 'class-variance-authority';
import React from 'react';
import Link, { LinkProps } from 'next/link';

import { titleStyle, textStyle, displayStyle } from './Typography.style';
// DISPLAY
export type DisplayPropsExtended = VariantProps<typeof displayStyle> & {
    children: React.ReactNode | string;
    className?: string;
    exchange?: boolean;
    size: 'xl' | 'lg' | 'md';
}

export type TitleElement = {
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
    degree: '0' | '1' | '2' | '3' | '4';
    exchange?: boolean;
}

export const validTextElements = ['p', 'span', 'small', 'strong', 'em'] as const;
export type TextNames = typeof validTextElements[number];

export type TextElement = { 
    p: true
} | {
    span: true
} | {
    small: true
} | {
    strong: true
} | {
    em: true
};

export type TextPropsExtended = TextElement & VariantProps<typeof textStyle> & {
    children: React.ReactNode | string;
    className?: string;
    degree: '0' | '1' | '2' | '3' | '4';
    size: 'lg' | 'md' | 'sm' | 'xs',
    exchange?: boolean;
}

export type LinkPropsExtended = LinkProps & VariantProps<typeof textStyle> & {
    children: React.ReactNode | React.ReactNode[] | string;
    className?: string;
    degree?: '0' | '1' | '2' | '3' | '4';
    size: 'lg' | 'md' | 'sm' | 'xs',
    exchange?: boolean;
}
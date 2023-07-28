import { VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';
import Link, { LinkProps } from 'next/link';

import { titleStyle, textStyle, displayStyle } from './Typography.style';
// DISPLAY
export type DisplayPropsExtended = VariantProps<typeof displayStyle> & {
    children: React.ReactNode | string;
    className?: string;
    exchange?: boolean;
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

export type TitleNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TitlePropsExtended = TitleElement & VariantProps<typeof titleStyle> & {
    children: React.ReactNode | string;
    className?: string;
    degree: '0' | '1' | '2' | '3' | '4';
    exchange?: boolean;
}

export type TextNames = 'p' | "span" | 'small' | 'strong' | 'em';
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
    exchange?: boolean;
}

export type LinkPropsExtended = LinkProps & VariantProps<typeof textStyle> & {
    children: React.ReactNode | React.ReactNode[] | string;
    className?: string;
    degree?: '0' | '1' | '2' | '3' | '4';
    exchange?: boolean;
}
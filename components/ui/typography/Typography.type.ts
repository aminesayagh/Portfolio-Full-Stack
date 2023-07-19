import { VariantProps } from 'class-variance-authority';
import { TMode, TStatus } from '../type';

import { titleStyle, titleColorStatus, titleColorDegree } from './Typography.style';

export type TitleElement = {
    h1: true,
} | {
    h2: true,
} | {
    h3: true,
} | {
    h4: true,
} | {
    h5: true,
} | {
    h6: true,
};

export type TitleNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TitlePropsExtended = TitleElement & VariantProps<typeof titleStyle> & {
    children: React.ReactNode | string,
    className?: string,
    degree: '0' | '1' | '2' | '3' | '4',
    status: TStatus,
}

export type TextNames = 'p' | 'span' | 'small' | 'strong' | 'em';
export type TextElement = {
    p: true,
} | {
    span: true,
} | {
    small: true,
} | {
    strong: true,
} | {
    em: true,
}

type TextProps = VariantProps<typeof titleStyle> & {
    children: React.ReactNode | string,
    className?: string,
    degree: '0' | '1' | '2' | '3' | '4',
    status: TStatus,
}

export type TextPropsExtended = TextElement & TextProps;

export type LinkPropsExtended = VariantProps<typeof titleStyle> & TextProps & {
    _target?: '_blank' | '_self' | '_parent' | '_top',
    href: string,
}

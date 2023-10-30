
import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { TextPropsType } from '@/components/ui/typography';
import React from 'react';
interface PropsIcon {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode,
}

export interface ButtonProps extends PropsIcon, AriaButtonProps, Partial<TextPropsType> {
    title?: string;
    full?: boolean;
}
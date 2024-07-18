
import { ReactNode } from 'react';
import { ButtonProps as AriaButtonProps } from 'react-aria-components';

import { TextPropsType } from '@/components/ui/typography';

interface PropsIcon {
    icon?: ReactNode;
    iconRight?: ReactNode,
}

export interface ButtonProps extends PropsIcon, AriaButtonProps, Partial<TextPropsType> {
    title?: string;
    full?: boolean;
}

import { Button, ButtonProps as AriaButtonProps } from 'react-aria-components';
import { VariantProps } from 'class-variance-authority';
import { TextPropsType, TextSizes } from '@/components/ui/typography';
interface PropsIcon {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode,
}

export interface ButtonProps extends PropsIcon, AriaButtonProps, Partial<TextPropsType> {
    full?: boolean;
}
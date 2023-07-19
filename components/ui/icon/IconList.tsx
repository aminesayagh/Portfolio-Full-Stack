import { SVGAttributes } from "react";
import { IconChevronRight, IconChevronDown, IconExclamationCircle } from '@tabler/icons-react';

export interface IconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: number | string;
}

const ListIconComponents = {
    IconChevronDown,
    IconChevronRight,
    IconExclamationCircle,
} as const;

export type IconNames = keyof typeof ListIconComponents;

export const IconNamesValues = Object.keys(ListIconComponents) as IconNames[];

export default ListIconComponents as { [key in IconNames]: (props: IconProps) => JSX.Element };
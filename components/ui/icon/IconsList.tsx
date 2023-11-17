import { SVGAttributes } from "react";
import { IconChevronRight, IconChevronDown, IconExclamationCircle, IconCornerLeftDown, IconArrowUpRight, IconShare, IconArrowBigRightFilled } from '@tabler/icons-react';

export interface IconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: number | string;
}

const ListIconComponents = {
    IconChevronDown: (props: IconProps) => <IconChevronDown {...props} />,
    IconChevronRight: (props: IconProps) => <IconChevronRight {...props} />,
    IconExclamationCircle: (props: IconProps) => <IconExclamationCircle {...props} />,
    IconCornerLeftDown: (props: IconProps) => <IconCornerLeftDown {...props} />,
    IconArrowUpRight: (props: IconProps) => <IconArrowUpRight {...props} />,
    IconShare: (props: IconProps) => <IconShare {...props} />,
    IconArrowBigRightFilled: (props: IconProps) => <IconArrowBigRightFilled {...props} />,

} as const;

export type IconNames = keyof typeof ListIconComponents;
// const IconNamesValues = Object.keys(ListIconComponents) as IconNames[];

export default ListIconComponents as { [key in IconNames]: (props: IconProps) => JSX.Element };
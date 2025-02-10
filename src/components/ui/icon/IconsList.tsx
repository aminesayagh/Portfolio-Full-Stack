import type { SVGAttributes } from "react";
import React from "react";

import {
  IconChevronRight,
  IconChevronDown,
  IconExclamationCircle,
  IconCornerLeftDown,
  IconArrowUpRight,
  IconArrowDownRight,
  IconArrowUpLeft,
  IconArrowDownLeft,
  IconShare,
  IconArrowBigRightFilled
} from "@tabler/icons-react";

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  size?: number | string;
}

export const ListIconComponents = {
  IconChevronDown: (props: IconProps) => <IconChevronDown {...props} />,
  IconChevronRight: (props: IconProps) => <IconChevronRight {...props} />,
  IconExclamationCircle: (props: IconProps) => (
    <IconExclamationCircle {...props} />
  ),
  IconCornerLeftDown: (props: IconProps) => <IconCornerLeftDown {...props} />,
  IconArrowUpRight: (props: IconProps) => <IconArrowUpRight {...props} />,
  IconArrowDownRight: (props: IconProps) => <IconArrowDownRight {...props} />,
  IconArrowUpLeft: (props: IconProps) => <IconArrowUpLeft {...props} />,
  IconArrowDownLeft: (props: IconProps) => <IconArrowDownLeft {...props} />,
  IconShare: (props: IconProps) => <IconShare {...props} />,
  IconArrowBigRightFilled: (props: IconProps) => (
    <IconArrowBigRightFilled {...props} />
  )
} as const;

export type IconNames = keyof typeof ListIconComponents;
// const IconNamesValues = Object.keys(ListIconComponents) as IconNames[];

export default ListIconComponents as {
  [key in IconNames]: (props: IconProps) => React.ReactElement;
};

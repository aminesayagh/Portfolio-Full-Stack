import type { ReactNode } from "react";

import type { TextPropsExtended } from "@/components/ui/typography";

import type { ButtonProps as AriaButtonProps } from "react-aria-components";

interface PropsIcon {
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export interface ButtonProps
  extends PropsIcon,
    AriaButtonProps,
    TextPropsExtended {
  title?: string;
  full?: boolean;
}

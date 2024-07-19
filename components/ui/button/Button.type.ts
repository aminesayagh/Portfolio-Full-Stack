import { ReactNode } from "react";
import { ButtonProps as AriaButtonProps } from "react-aria-components";

import { TextPropsExtended } from "@/components/ui/typography";

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


import type { FC } from "react";
import React from "react";

import LinkNext from "next/link";

import { CursorContent } from "@/components/ui/cursor";

import { text } from "./Typography";

import type { TextPropsExtended} from "./Typography";
import type { LinkProps } from "next/link";

export interface LinkPropsExtended extends TextPropsExtended, LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const Link: FC<LinkPropsExtended> = ({
  weight,
  degree,
  size,
  mode,
  href,
  className,
  children,
  ...props
}) => {
  return (
    <CursorContent
      name="cursorPointer_header_email"
      component="CursorEvent"
      props={{
        event: "pointer"
      }}
      {...props}
    >
      <LinkNext
        href={href}
        className={text(
          {
            weight,
            degree,
            size,
            mode
          },
          className
        )}
      >
        {children}
      </LinkNext>
    </CursorContent>
  );
};

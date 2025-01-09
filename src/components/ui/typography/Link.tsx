import type { FC } from "react";
import React from "react";

import LinkNext from "next/link";

import { text } from "./Typography";

import type { TextPropsExtended } from "./Typography";
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
      {...props}
    >
      {children}
    </LinkNext>
  );
};

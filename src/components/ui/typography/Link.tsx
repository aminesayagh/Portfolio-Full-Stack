import type { FC } from "react";
import React from "react";

import LinkNext from "next/link";
import type { LinkProps } from "next/link";

import { TextPropsExtended, text } from "./Typography";

export interface LinkPropsExtended extends TextPropsExtended, LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const Link: FC<LinkPropsExtended> = ({
  href,
  weight,
  degree,
  size,
  mode,
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

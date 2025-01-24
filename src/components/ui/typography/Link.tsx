import type { FC } from "react";
import React from "react";

import LinkNext from "next/link";
import type { LinkProps } from "next/link";

export interface LinkPropsExtended extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const Link: FC<LinkPropsExtended> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <LinkNext
      href={href}
      className={className}
      {...props}
    >
      {children}
    </LinkNext>
  );
};

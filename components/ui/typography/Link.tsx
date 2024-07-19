import LinkNext, { LinkProps } from "next/link";
import { FC } from "react";

import { CursorContent } from "@/components/ui/cursor";

import { TextPropsExtended, text } from "./Typography";

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

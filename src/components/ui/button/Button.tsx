"use client";

import React, { forwardRef, useMemo, memo } from "react";

import { FocusRing } from "react-aria";
import { Button } from "react-aria-components";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "./Button.type";

const ButtonUi = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      full,
      name,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClasses = useMemo(
      () =>
        cn(
          "touch-none select-none focus:outline-none",
          "gap-2 flex flex-row flex-nowrap items-center justify-center",
          "font-sans font-bold",
          "text-clip whitespace-nowrap overflow-hidden",
          "align-middle",
          full ? "w-full" : "",
          typeof className === "string" ? className : ""
        ),
      [full, className]
    );

    return (
      <FocusRing>
        <Button name={name} ref={ref} className={buttonClasses} {...props}>
          {children}
        </Button>
      </FocusRing>
    );
  }
);

ButtonUi.displayName = "ButtonUi"; // Add display name

const MemoizedButtonUi = memo(ButtonUi);
export default MemoizedButtonUi;
"use client";

import React, { forwardRef, useMemo, memo } from "react";

import { FocusRing } from "react-aria";
import { Button } from "react-aria-components";

import { text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "./Button.type";

const ButtonUi = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "auto",
      full,
      weight,
      name,
      degree = "1",
      mode,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClasses = useMemo(
      () =>
        cn(
          "touch-none select-none focus:outline-none",
          "gap-2 flex flex-row flex-nowrap self-center items-center justify-center",
          "font-sans font-bold",
          "text-clip whitespace-nowrap overflow-hidden",
          "align-middle",
          full ? "w-full" : "",
          text({ weight, size, degree, mode }),
          typeof className === "string" ? className : ""
        ),
      [size, full, weight, degree, mode, className]
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

import React, { createElement, useMemo } from "react";

import { cn } from "@/lib/utils";

import type { ContainerProps } from "./Container.type";

const Container = ({
  as = "div",
  children,
  className,
  ...props
}: ContainerProps) => {
  const classNames = useMemo(
    () => cn("mx-auto w-full z-container h-fit container", className),
    [className]
  );
  return (
    <>
      {createElement(
        as,
        {
          className: classNames,
          ...props
        },
        children
      )}
    </>
  );
};

export default Container;

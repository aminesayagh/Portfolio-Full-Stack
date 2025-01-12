import React, { createElement, useMemo } from "react";

import { twMerge } from "tailwind-merge";

import type { ContainerProps } from "./Container.type";

const Container = ({
  as = "div",
  children,
  className,
  ...props
}: ContainerProps) => {
  const classNames = useMemo(
    () => twMerge("mx-auto w-full z-container h-fit container", className),
    [props.size, className]
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

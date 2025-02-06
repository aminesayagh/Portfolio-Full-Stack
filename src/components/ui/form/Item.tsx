import React from "react";

import { ListBoxItem as Item } from "react-aria-components";
import type { ListBoxItemProps as ItemProps } from "react-aria-components";

import { mergeClassName } from "@/lib/utils";
import { formFieldColor } from "./Style";

const itemClassName = [
  "flex flex-row gap-2 px-4 py-4 outline-none w-full",
  "cursor-pointer",
  "text-xs font-medium text-active tracking-wider",
  "transition-all duration-200",
  "border-solid border-b border-gray-700/20",
  "hover:bg-black-400/60 border-b border-primary-500"
] as string[];

const ItemUi = ({ className, ...props }: ItemProps) => {
  return (
    <Item className={mergeClassName([...itemClassName, ...formFieldColor], className)} {...props} />
  );
};

export default ItemUi;

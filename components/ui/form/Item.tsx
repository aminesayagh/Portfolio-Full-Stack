import {
  ListBoxItem as Item,
  ListBoxItemProps as ItemProps
} from "react-aria-components";

import { mergeClassName } from "@/helpers/className";

import Style from "./Form.module.scss";

const ItemUi = ({ className, ...props }: ItemProps) => {
  return (
    <Item
      className={mergeClassName(Style["item"] as string, className)}
      {...props}
    />
  );
};

export default ItemUi;

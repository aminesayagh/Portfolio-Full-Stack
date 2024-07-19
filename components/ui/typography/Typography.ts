import { cva, VariantProps } from "class-variance-authority";
import { twMerge, ClassNameValue } from "tailwind-merge";

import Style from "./Typography.module.scss";

const textDefault = "inline-block align-middle";
const fontFamilyTitle = "font-sans";
const fontFamilyText = "font-sans";

export const typographyColorDegree = cva("", {
  variants: {
    mode: {
      normal: "",
      exchanged: ""
    },
    degree: {
      "1": "",
      "2": "",
      "3": "",
      "4": ""
    }
  },
  defaultVariants: {
    mode: "normal",
    degree: "1"
  },
  compoundVariants: [
    {
      mode: "normal",
      degree: "1",
      className: "text-white-100"
    },
    {
      mode: "normal",
      degree: "2",
      className: "text-white-600"
    },
    {
      mode: "normal",
      degree: "3",
      className: "text-white-700"
    },
    {
      mode: "normal",
      degree: "4",
      className: "text-white-800"
    },
    {
      mode: "exchanged",
      degree: "1",
      className: "text-black-100"
    },
    {
      mode: "exchanged",
      degree: "2",
      className: "text-black-400"
    },
    {
      mode: "exchanged",
      degree: "3",
      className: "text-black-700"
    },
    {
      mode: "exchanged",
      degree: "4",
      className: "text-black-800"
    }
  ]
});

export type TypographyColorProps = VariantProps<typeof typographyColorDegree>;

export const displayStyle = cva(
  [textDefault, fontFamilyTitle, Style["display"]],
  {
    variants: {
      weight: {
        bold: "font-black",
        semibold: "font-bold",
        medium: "font-regular"
      },
      size: {
        xl: Style["display_xl"],
        lg: Style["display_lg"],
        md: Style["display_md"]
      }
    },
    defaultVariants: {
      weight: "bold"
    }
  }
);

export type DisplayPropsExtended = VariantProps<typeof displayStyle> &
  TypographyColorProps;

export const titleStyle = cva([textDefault, fontFamilyTitle, Style["title"]], {
  variants: {
    weight: {
      bold: "font-extrabold",
      semibold: "font-bold",
      medium: "font-medium"
    },
    size: {
      h1: Style["title_h1"],
      h2: Style["title_h2"],
      h3: Style["title_h3"],
      h4: Style["title_h4"],
      h5: Style["title_h5"],
      h6: Style["title_h6"]
    }
  },
  defaultVariants: {
    weight: "bold"
  }
});

export type TitlePropsExtended = VariantProps<typeof titleStyle> &
  TypographyColorProps;

export const textStyle = cva([textDefault, fontFamilyText, Style["text"]], {
  variants: {
    weight: {
      bold: "font-black",
      semibold: "font-semibold",
      medium: "font-medium"
    },
    size: {
      xl: Style["text_xl"],
      lg: Style["text_lg"],
      md: Style["text_md"],
      sm: Style["text_sm"],
      xs: Style["text_xs"],
      xxs: Style["text_xxs"],
      auto: Style["text_auto"]
    }
  },
  defaultVariants: {
    weight: "medium",
    size: "auto"
  }
});

export type TextPropsExtended = VariantProps<typeof textStyle> &
  TypographyColorProps;

export const title = (
  { mode, degree, weight, size }: TitlePropsExtended,
  ...className: ClassNameValue[]
) =>
  twMerge(
    titleStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );

export const display = (
  { mode, degree, weight, size }: DisplayPropsExtended,
  ...className: ClassNameValue[]
) =>
  twMerge(
    displayStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );

export const text = (
  { mode, degree, weight, size }: TextPropsExtended,
  ...className: ClassNameValue[]
) =>
  twMerge(
    textStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );

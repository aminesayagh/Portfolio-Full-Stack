import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";
import type { ClassNameValue } from "tailwind-merge";

const textDefault = "inline-block align-middle hyphens-manual text-balance";
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
      className: "text-white-400"
    },
    {
      mode: "normal",
      degree: "3",
      className: "text-white-500"
    },
    {
      mode: "normal",
      degree: "4",
      className: "text-white-600"
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

export const displayStyle = cva([textDefault, fontFamilyTitle], {
  variants: {
    weight: {
      bold: "font-black",
      semibold: "font-bold",
      medium: "font-regular"
    },
    size: {
      xl: "text-display-xl",
      lg: "text-display-lg",
      md: "text-display-md"
    }
  },
  defaultVariants: {
    weight: "bold"
  }
});

export type DisplayPropsExtended = VariantProps<typeof displayStyle> &
  TypographyColorProps;

export const titleStyle = cva([textDefault, fontFamilyTitle], {
  variants: {
    weight: {
      bold: "font-extrabold",
      semibold: "font-bold",
      medium: "font-medium"
    },
    size: {
      h1: "text-title-h1",
      h2: "text-title-h2",
      h3: "text-title-h3",
      h4: "text-title-h4",
      h5: "text-title-h5",
      h6: "text-title-h6"
    }
  },
  defaultVariants: {
    weight: "bold"
  }
});

export type TitlePropsExtended = VariantProps<typeof titleStyle> &
  TypographyColorProps;

export const textStyle = cva([textDefault, fontFamilyText, "tracking-widest"], {
  variants: {
    weight: {
      bold: "font-black",
      semibold: "font-semibold",
      medium: "font-medium"
    },
    size: {
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
      xxs: "text-xxs",
      auto: "text-auto"
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
  cn(
    titleStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );

export const display = (
  { mode, degree, weight, size }: DisplayPropsExtended,
  ...className: ClassNameValue[]
) =>
  cn(
    displayStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );

export const text = (
  { mode, degree, weight, size }: TextPropsExtended,
  ...className: ClassNameValue[]
) =>
  cn(
    textStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );

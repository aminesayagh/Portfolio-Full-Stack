import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";
import type { ClassNameValue } from "tailwind-merge";

const textDefault = "inline-block align-middle hyphens-manual text-balance";
const fontFamilyTitle = "font-sans";
const fontFamilyText = "font-sans";

export const typographyColorDegree = cva("", {
  variants: {
    degree: {
      "1": "text-content-100 dark:text-content-dark-100",
      "2": "text-content-200 dark:text-content-dark-200",
      "3": "text-content-300 dark:text-content-dark-300",
      "4": "text-content-400 dark:text-content-dark-400"
    }
  },
  defaultVariants: {
    degree: "1"
  }
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
      medium: "font-semibold"
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
      xl: "text-body-xl",
      lg: "text-body-lg",
      md: "text-body-md",
      sm: "text-body-sm",
      xs: "text-body-xs",
      xxs: "text-body-xxs",
      auto: "text-body-auto"
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
  { degree, weight, size }: TitlePropsExtended,
  ...className: ClassNameValue[]
) =>
  cn(
    titleStyle({ weight, size }),
    typographyColorDegree({ degree }),
    ...className
  );

export const display = (
  { degree, weight, size }: DisplayPropsExtended,
  ...className: ClassNameValue[]
) =>
  cn(
    displayStyle({ weight, size }),
    typographyColorDegree({ degree }),
    ...className
  );

export const text = (
  { degree, weight, size }: TextPropsExtended,
  ...className: ClassNameValue[]
) =>
  cn(
    typographyColorDegree({ degree }),
    textStyle({ weight, size }),
    ...className
  );

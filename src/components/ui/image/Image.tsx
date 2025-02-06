import React, { forwardRef, memo } from "react";

import Image from "next/image";
import type { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface Props extends Omit<ImageProps, "src"> {
  src: ImageProps["src"];
  alt: string;
}

const ImageUi = forwardRef<HTMLImageElement, Props>(
  ({ src, alt, className, priority = false, quality = 80, sizes, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        priority={priority}
        quality={quality}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
        className={cn(className, "w-full")}
        {...props}
      />
    );
  }
);

export default memo(ImageUi);

import Link, { LinkProps } from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import Image from "@/components/ui/image";

interface LogoProps extends Omit<LinkProps, "size" | "degree" | "children"> {
  alt: string;
  size: number;
  mode: "dark" | "white";
}
const Logo = ({ alt, mode, size, ...props }: LogoProps) => {
  return (
    <>
      <Link
        className={
          twMerge("flex flex-row items-center justify-center gap-2") as string
        }
        {...props}
      >
        <Image
          className="w-12 xxs:w-14"
          src={`https://res.cloudinary.com/dvxn9nvjs/image/upload/v1680447716/portfolio/logo/${mode == "dark" ? "color_double_mode_dark_ya6enh" : "color_double_mode_light_ryyabn"}.svg`}
          alt={alt}
          width={size}
          height={size}
        />
      </Link>
    </>
  );
};

export default Logo;

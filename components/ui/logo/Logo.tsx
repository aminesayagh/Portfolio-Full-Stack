import Link, { LinkProps } from "next/link";
import React from "react";

import Image from "@/components/ui/image";

interface LogoProps extends Omit<LinkProps, "size" | "degree" | "children"> {
  alt: string;
  size: number;
  mode: "dark" | "white";
}
const Logo = ({ alt, size, ...props }: LogoProps) => {
  return (
    <>
      <Link
        className="flex flex-row items-center justify-center gap-2"
        {...props}
      >
        <Image
          className="w-12 xxs:w-14"
          src="/logo/logo.svg"
          alt={alt}
          width={size}
          height={size}
        />
      </Link>
    </>
  );
};

export default Logo;

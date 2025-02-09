import React from "react";

import Link from "next/link";

import Image from "@/components/ui/image";

import type { LinkProps } from "next/link";

interface LogoProps extends Omit<LinkProps, "size" | "degree" | "children"> {
  alt: string;
  size: number;
  mode: "dark" | "white";
}
const Logo = ({ alt, size, ...props }: LogoProps) => {
  return (
    <Link
      className="flex flex-row items-center justify-center gap-2 select-none"
      {...props}
    >
      <Image
        className="size-10 object-contain object-center xxs:size-14"
        src="/logo/logo.svg"
        alt={alt}
        width={size}
        height={size}
        placeholder={undefined}
        priority={true}
      />
    </Link>
  );
};

export default Logo;

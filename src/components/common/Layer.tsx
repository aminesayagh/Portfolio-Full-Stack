"use client";

import React, { useEffect } from "react";

import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";

import Container from "@/components/ui/container";
import { usePreloader } from "@/components/ui/preloader";

const HeaderDynamic = dynamic(() => import("@/components/common/Header"), {});
const FooterDynamic = dynamic(() => import("@/components/common/Footer"), {});

const Layer = ({
  children
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const { endLoading } = usePreloader();
  const locale = useLocale();
  useEffect(() => {
    if (endLoading) {
      if (!document.body.classList.contains("is-loaded")) {
        document.body.classList.add("is-loaded");
      }
      const timer = setTimeout(() => {
        if (document.body.classList.contains("is-loaded"))
          document.body.classList.remove("is-loaded");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => null;
  }, [locale, endLoading]);

  return (
    <>
      <HeaderDynamic />
      {children as React.ReactElement}
      <Container
        data-scroll-section
        as="footer"
        size="lg"
        id="footer"
        className={twMerge("flex flex-col gap-8 xl:gap-12")}
      >
        <FooterDynamic />
      </Container>
    </>
  );
};

export default Layer;

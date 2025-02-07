import React from "react";

import dynamic from "next/dynamic";

import Container from "@/components/ui/container";

const HeaderDynamic = dynamic(() => import("@/components/common/Header"), {});
const FooterDynamic = dynamic(() => import("@/components/common/Footer"), {});

const Layer = ({
  children
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {

  return (
    <>
      <HeaderDynamic />
      {children as React.ReactElement}
      <Container
        data-scroll-section
        as="footer"
        size="lg"
        id="footer"
        className="flex flex-col gap-8 xl:gap-12"
      >
        <FooterDynamic />
      </Container>
    </>
  );
};

export default Layer;

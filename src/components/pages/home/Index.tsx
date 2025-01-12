import React, { Suspense } from "react";

import dynamic from "next/dynamic";

import Container from "@/components/ui/container";

const Intro = dynamic(() => import("./intro/Intro"));
const Overview = dynamic(() => import("./overview/Overview"));
const LandingPage = () => (
  <>
    <Container data-scroll-section as="section" size="lg" id="intro">
      <Intro />
    </Container>
    <span className="h-24 block" />
    <Suspense fallback={<div>Loading...</div>}>
      <Overview />
    </Suspense>
    <div data-scroll-section className="block w-full h-6 xs:h-12" />
  </>
);

export default LandingPage;

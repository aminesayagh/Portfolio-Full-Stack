import React, { Suspense } from "react";

import dynamic from "next/dynamic";

import Container from "@/components/ui/container";

const Intro = dynamic(() => import("./intro"));
const Overview = dynamic(() => import("./overview"));
const About = dynamic(() => import("./about"));
const Experiences = dynamic(() => import("./experiences"));
// const Works = dynamic(() => import("./works"));

const LandingPage = () => (
  <>
    <Container as="section" size="lg" id="intro">
      <Intro />
    </Container>
    <span className="h-24 block" />
    <Suspense fallback={<div>Loading...</div>}>
      <Overview />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
    <span className="h-24 block" />
    <Suspense fallback={<div>Loading...</div>}> 
      <Experiences />
    </Suspense>
    {/* <Suspense fallback={<div>Loading...</div>}>
      <Works />
    </Suspense> */}
    <div className="block w-full h-6 xs:h-[20vh]" />
  </>
);

export default LandingPage;

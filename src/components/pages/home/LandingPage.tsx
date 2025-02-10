import React, { Suspense } from "react";

import dynamic from "next/dynamic";

const Intro = dynamic(() => import("./intro"));
const Overview = dynamic(() => import("./overview"));
const About = dynamic(() => import("./about"));
const Experiences = dynamic(() => import("./experiences"));
const Works = dynamic(() => import("./works"));

const LandingPage = () => (
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <Intro />
    </Suspense>
    <span className="h-24 block" />
    <Suspense fallback={<div>Loading...</div>}>
      <Overview />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
    <span className="h-xl block" />
    <Suspense fallback={<div>Loading...</div>}> 
      <Experiences />
    </Suspense>
    <span className="h-24 sm:h-40 block" />
    <Suspense fallback={<div>Loading...</div>}>
      <Works />
    </Suspense>
    <span className="h-24 sm:h-40 block" />
  </>
);

export default LandingPage;

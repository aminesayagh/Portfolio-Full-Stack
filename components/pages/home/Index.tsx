import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import Container from "@/components/ui/container";

const Intro = dynamic(() => import("./Intro"));
const Manifesto = dynamic(() => import("./Manifesto"));
const Video = dynamic(() => import("./Video"));
const Expertise = dynamic(() => import("./Expertise"));
const CallToAction = dynamic(() => import("./Action"));
const Cases = dynamic(() => import("./Cases"));
const Action = dynamic(() => import("./ActionContact"));

const LandingPage = () => (
  <>
    <Container data-scroll-section as="section" size="lg" id="intro">
      <Intro />
    </Container>
    <Suspense>
      <Container
        data-scroll-section
        id="video"
        as="section"
        className="py-24"
        size="lg"
      >
        <Video />
      </Container>
    </Suspense>
    <Container
      data-scroll-section
      id="manifesto"
      as="section"
      size="lg"
      className="pb-24"
    >
      <Manifesto />
    </Container>
    <section data-scroll-section id="experience">
      <Container
        size="full"
        as="div"
        className="relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200"
      >
        <Expertise />
      </Container>
    </section>
    <Container data-scroll-section as="section" size="lg" id="action-1">
      <CallToAction />
    </Container>
    <Container
      data-scroll-section
      as="section"
      size="lg"
      id="cases"
      className="py-10 h-fit"
    >
      <Cases />
    </Container>
    <Container data-scroll-section as="section" size="lg" id="action-contact">
      <Action />
    </Container>
    <div data-scroll-section className="block w-full h-6 xs:h-12"></div>
  </>
);

export default LandingPage;

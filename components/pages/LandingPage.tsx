import Container from '@/components/ui/container';
import React, { Profiler, ProfilerOnRenderCallback, useEffect } from 'react';


import Intro from './sections/1-intro';
import Manifesto from './sections/2-manifesto';
import Video from './sections/video';
import Expertise from './sections/3-expertise';
import CallToAction from './sections/3_1-action';
import Cases from './sections/4-cases';
import Action from './sections/5-action';

import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import useResizeObserver from 'use-resize-observer';
import { useDebounce } from '@/hook/useDebounce';

import { ScrollTrigger } from '@/utils/gsap';

const LandingPage = () => {
    const ref = React.useRef(null);
    // const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLSpanElement>({ ref: ref });
    // const width = useDebounce(widthContainer, 50);
    // const height = useDebounce(heightContainer, 50);

    // useEffect(() => {
    //     ScrollTrigger.refresh();
    // }, [width, height])
    return (
        <>
            <Container data-scroll-section as='section' size='lg' id='intro' >
                <Intro />
            </Container>
            <Suspense >
                <Container data-scroll-section id='video' as='section' className='py-24' size='lg'  >
                    <Video />
                </Container>
            </Suspense>
            <Container data-scroll-section id='manifesto' as='section' size='lg' className='pb-24'  >
                <Manifesto />
            </Container>
            <section data-scroll-section id='experience'>
                <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200'  >
                    <Expertise />
                </Container>
            </section>
            <Container data-scroll-section as='section' size='lg' id='action-1' >
                <CallToAction />
            </Container>
            <Container data-scroll-section as='section' size='lg' id='cases' className='py-10 h-fit' >
                <Cases />
            </Container>
            <Container data-scroll-section as='section' size='lg' id='action-contact' >
                <Action />
            </Container>
            <div data-scroll-section className='block h-6 xs:h-12 w-full'></div>
        </>
    )
}

export default LandingPage;
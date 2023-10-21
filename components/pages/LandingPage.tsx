import { Container } from '@/components/ui';
import React, { Profiler, ProfilerOnRenderCallback } from 'react';
import { DynamicIntro, DynamicManifesto, DynamicCases, DynamicAction, DynamicVideo, DynamicExpertise, DynamicCallToAction } from '@/components/pages/sections';


import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicFooter = dynamic(() => import('@/components/common/footer'));
const bigLoaded = 0
const callback: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    // if (phase === 'mount' && actualDuration > bigLoaded) {
    //     console.log(`${id} is big and loaded`);
    // }
    // console.log(`${id} took ${actualDuration} ms to render`);
}
const LandingPage = () => {
    return (
        <>
            <Profiler id='LandingPage' onRender={callback}>
                <Container data-scroll-section as='section' size='lg' id='intro' >
                    <DynamicIntro />
                </Container>
            </Profiler>
            <section data-scroll-section className='block h-24 w-full' ></section>
            <Profiler id='video' onRender={callback}>
                <Suspense >
                    <Container data-scroll-section id='video' as='section' size='lg'  >
                        <DynamicVideo />
                    </Container>
                </Suspense>
            </Profiler>
            <section data-scroll-section className='block h-16 xxs:h-0 w-full'></section>
            <Profiler id='manifesto' onRender={callback}>
                <Container data-scroll-section id='manifesto' as='section' size='lg'  >
                    <DynamicManifesto />
                </Container>
            </Profiler>
            <section data-scroll-section className='block h-24 xxs:h-24 w-full'></section>
            <Profiler id='experience' onRender={callback}>
                <section data-scroll-section id='experience' >
                    <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200' data-scroll data-scroll-position='end' data-scroll-speed='0.3'  >
                        <DynamicExpertise />
                    </Container>
                </section>
            </Profiler>
            <Profiler id='action-1' onRender={callback}>
                <Container data-scroll-section as='section' size='lg' id='action-1' >
                    <DynamicCallToAction />
                </Container>
            </Profiler>
            <section data-scroll-section className='block h-24 w-full'></section>
            <Profiler id='cases' onRender={callback}>
                <Container data-scroll-section as='section' size='lg' id='cases' className='py-10 h-fit' >
                    <DynamicCases />
                </Container>
            </Profiler>
            <Profiler id='action-contact' onRender={callback}>
                <Container data-scroll-section as='section' size='lg' id='action-contact' >
                    <DynamicAction />
                </Container>
            </Profiler>
            <section data-scroll-section className='block h-6 xs:h-12 w-full'></section>
            <Profiler id='footer' onRender={callback}>
                <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                    <DynamicFooter />
                </Container>
            </Profiler>
        </>
    )
}

export default LandingPage;
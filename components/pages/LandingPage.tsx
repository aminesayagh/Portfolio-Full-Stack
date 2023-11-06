import Container from '@/components/ui/container';
import React, { Profiler, ProfilerOnRenderCallback } from 'react';


import DynamicIntro from './sections/1-intro';
import DynamicManifesto from './sections/2-manifesto';
import DynamicVideo from './sections/video';
import DynamicExpertise from './sections/3-expertise';
import DynamicCallToAction from './sections/3_1-action';
import DynamicCases from './sections/4-cases';
import DynamicAction from './sections/5-action';

import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicFooter = dynamic(() => import('@/components/common/footer'));

const LandingPage = () => {
    return (
        <>
            <Container data-scroll-section as='section' size='lg' id='intro' >
                <DynamicIntro />
            </Container>
            <div data-scroll-section className='block h-24 w-full' ></div>
            <Suspense >
                <Container data-scroll-section id='video' as='section' size='lg'  >
                    <DynamicVideo />
                </Container>
            </Suspense>
            <div data-scroll-section className='block h-16 xxs:h-0 w-full'></div>
            <Container data-scroll-section id='manifesto' as='section' size='lg'  >
                <DynamicManifesto />
            </Container>
            <div data-scroll-section className='block h-24 xxs:h-24 w-full'></div>
            <section data-scroll-section id='experience'>
                <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200'  >
                    <DynamicExpertise />
                </Container>
            </section>
            <Container data-scroll-section as='section' size='lg' id='action-1' >
                <DynamicCallToAction />
            </Container>
            <div data-scroll-section className='block h-24 w-full'></div>
            <Container data-scroll-section as='section' size='lg' id='cases' className='py-10 h-fit' >
                <DynamicCases />
            </Container>
            <Container data-scroll-section as='section' size='lg' id='action-contact' >
                <DynamicAction />
            </Container>
            <div data-scroll-section className='block h-6 xs:h-12 w-full'></div>
            <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                <DynamicFooter />
            </Container>
        </>
    )
}

export default LandingPage;
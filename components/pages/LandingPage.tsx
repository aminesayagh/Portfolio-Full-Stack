import { Container } from '@/components/ui';
import React from 'react';
import { DynamicIntro, DynamicManifesto, DynamicCases, DynamicAction, DynamicVideo, DynamicExpertise, DynamicCallToAction } from '@/components/pages/sections';


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
            <section data-scroll-section className='block h-24 w-full' ></section>
            <Suspense >
                <Container data-scroll-section id='video' as='section' size='lg'  >
                    <DynamicVideo />
                </Container>
            </Suspense>
            <section data-scroll-section className='block h-16 xxs:h-0 w-full'></section>
            <Container data-scroll-section id='manifesto' as='section' size='lg'  >
                <DynamicManifesto />
            </Container>
            <section data-scroll-section className='block h-24 xxs:h-24 w-full'></section>
            <section data-scroll-section id='experience' >
                <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200' data-scroll data-scroll-position='end' data-scroll-speed='0.3'  >
                    <DynamicExpertise />
                </Container>
            </section>
            <Container data-scroll-section as='section' size='lg' id='action-1' >
                <DynamicCallToAction />
            </Container>
            <section data-scroll-section className='block h-24 w-full'></section>
            <Container data-scroll-section as='section' size='lg' id='cases' className='py-10 h-fit' >
                <DynamicCases />
            </Container>
            <Container data-scroll-section as='section' size='lg' id='action-contact' >
                <DynamicAction />
            </Container>
            <section data-scroll-section className='block h-6 xs:h-12 w-full'></section>
            <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                <DynamicFooter />
            </Container>
        </>
    )
}

export default LandingPage;
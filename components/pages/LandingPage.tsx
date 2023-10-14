import { Container } from '@/components/ui';
import React from 'react';
import { DynamicIntro, DynamicManifesto, DynamicCases, DynamicAction, DynamicVideo, DynamicExpertise, DynamicCallToAction } from '@/components/pages/sections';
import { MENU_ITEMS } from '@/conf/router';

import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicFooter = dynamic(() => import('@/components/common/footer'));

const LandingPage = () => {
    return (
        <React.Fragment>
            <Container data-scroll-section as='section' size='lg' id={MENU_ITEMS.intro.id} >
                <DynamicIntro />
            </Container>
            <section data-scroll-section className='block h-24 w-full' ></section>
            <Suspense >
                <Container data-scroll-section id='video' as='section' size='lg'  >
                    <DynamicVideo />
                </Container>
            </Suspense>
            <section data-scroll-section className='block h-16 xxs:h-0 w-full'></section>
            <Container data-scroll-section id={MENU_ITEMS.manifesto.id} as='section' size='lg'  >
                <DynamicManifesto />
            </Container>
            <section data-scroll-section className='block h-24 xxs:h-24 w-full'></section>
            <section data-scroll-section id={MENU_ITEMS.experience.id} >
                <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200' data-scroll data-scroll-position='end' data-scroll-speed='0.3'  >
                    <DynamicExpertise />
                </Container>
            </section>
            <Container data-scroll-section as='section' size='lg' id='action-1' >
                <DynamicCallToAction />
            </Container>
            <section data-scroll-section className='block h-24 w-full'></section>
            <Container data-scroll-section as='section' size='lg' id={MENU_ITEMS.cases.id} className='py-10 h-fit' >
                <DynamicCases />
            </Container>
            <Container data-scroll-section as='section' size='lg' id='action-contact' >
                <DynamicAction />
            </Container>
            <section data-scroll-section className='block h-6 xs:h-12 w-full'></section>
            <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                <DynamicFooter />
            </Container>
        </React.Fragment>
    )
}

export default LandingPage;
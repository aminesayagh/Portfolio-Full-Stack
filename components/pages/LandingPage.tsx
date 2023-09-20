import { Footer } from '@/components/common';

import { Container, Noise } from '@/components/ui';
import { DynamicIntro, DynamicManifesto, DynamicCases, DynamicAction, DynamicVideo, DynamicExpertise, DynamicCallToAction } from '@/components/pages/sections';
import { MENU_ITEMS } from '@/conf/router';
import { twMerge } from 'tailwind-merge';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicFooter = dynamic(() => import('@/components/common/footer'), {}); 
const LandingPage = () => {
    return (
        <>
            <Container data-scroll-section as='section' size='lg' id={MENU_ITEMS.intro.id} >
                <DynamicIntro />
            </Container>
            <span data-scroll-section className='block h-24 w-full' ></span>
            <Container data-scroll-section id='video' as='section' size='lg'  >
                <Suspense fallback={<div>Loading...</div>}>
                    <DynamicVideo />
                </Suspense>
            </Container>
            <span data-scroll-section className='block h-16 xxs:h-0 w-full'></span>
            <Container data-scroll-section id={MENU_ITEMS.manifesto.id} as='section' size='lg' className='h-[160vh]' >
                <DynamicManifesto />
            </Container>
            <span data-scroll-section className='block h-24 xxs:h-24 w-full'></span>
            <section data-scroll-section id={MENU_ITEMS.experience.id} >
                <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200' data-scroll data-scroll-position='end' data-scroll-speed='0.3'  >
                    <DynamicExpertise />
                    <Noise position='absolute' />
                </Container>
            </section>
            <Container data-scroll-section as='section' size='lg' id='action-1' >
                <DynamicCallToAction />
            </Container>
            <span data-scroll-section className='block h-24 w-full'></span>
            <Container data-scroll-section as='section' size='lg' id={MENU_ITEMS.cases.id} className='py-10 h-fit' >
                <Suspense fallback={<div>Loading...</div>}>
                    <DynamicCases />
                </Suspense>
            </Container>
            <Container data-scroll-section as='section' size='lg' id='action-contact' >
                <DynamicAction />
            </Container>
            <span data-scroll-section className='block h-6 xs:h-12 w-full'></span>
            <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                <DynamicFooter />
            </Container>
        </>
    )
}

export default LandingPage;
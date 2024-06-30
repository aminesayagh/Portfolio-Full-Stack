import Container from '@/components/ui/container';
import React from 'react';


import dynamic from 'next/dynamic';

const Intro = dynamic(() => import('./sections/1-intro'));
const Manifesto = dynamic(() => import('./sections/2-manifesto'));
const Video = dynamic(() => import('./sections/video'));
const Expertise = dynamic(() => import('./sections/3-expertise'));
const CallToAction = dynamic(() => import('./sections/3_1-action'));
const Cases = dynamic(() => import('./sections/4-cases'));
const Action = dynamic(() => import('./sections/5-action'));

import { Suspense } from 'react';

const LandingPage = () => (<>
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
    <div data-scroll-section className='block w-full h-6 xs:h-12'></div>
</>);

export default LandingPage;
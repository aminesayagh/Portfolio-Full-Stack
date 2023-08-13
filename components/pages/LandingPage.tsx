import { Header, Footer } from '@/components/common';
import { Container, Noise } from '@/components/ui';
import { Intro, Manifesto, Cases, Action, Video, Expertise, CallToAction } from '@/components/pages/sections';

import { twMerge } from 'tailwind-merge';

const LandingPage = () => {
    return (
        <>
            <Header />
            <Container as='section' size='lg' >
                <Intro />
            </Container>
            <span className='block h-40 w-full'></span>
            <Container as='div' size='lg'>
                <Video />
            </Container>
            <span className='block h-40 w-full'></span>
            <Container as='section' size='lg' >
                <Manifesto />
            </Container>
            <span className='block h-72 w-full'></span>
            <Container as='section' size='full' className='[&>*]:py-20 [&>*]:bg-white-200 relative overflow-hidden' >
                <Expertise />
                <Noise position='absolute' />
            </Container>
            <Container as='section' size='lg' className=''>
                <CallToAction />
            </Container>
            <span className='block h-40 w-full'></span>
            <Container as='section' size='lg' >
                <Cases />
            </Container>
            <span className='block h-40 w-full'></span>
            <Container as='section' size='lg' >
                <Action />
            </Container>
            <Footer />
        </>
    )
}

export default LandingPage;
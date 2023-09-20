import { Header, Footer } from '@/components/common';
import { Container, Noise } from '@/components/ui';
import { Intro, Manifesto, Cases, Action, Video, Expertise, CallToAction } from '@/components/pages/sections';
import { MENU_ITEMS } from '@/conf/router';
import { twMerge } from 'tailwind-merge';

const LandingPage = () => {
    return (
        <>
            <Container data-scroll-section as='section' size='lg' id={MENU_ITEMS.intro.id} >
                <Intro />
            </Container>
            <span data-scroll-section className='block h-24 w-full' ></span>
            <Container data-scroll-section id='video' as='section' size='lg'  >
                <Video />
            </Container>
            <span data-scroll-section className='block h-16 xxs:h-0 w-full'></span>
            <Container data-scroll-section id={MENU_ITEMS.manifesto.id} as='section' size='lg' className='h-[180vh]' >
                <Manifesto />
            </Container>
            <span data-scroll-section className='block h-24 xxs:h-24 w-full'></span>
            <section data-scroll-section id={MENU_ITEMS.experience.id} >
                <Container size='full' as='div' className='relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200' data-scroll data-scroll-position='end' data-scroll-speed='0.3'  >
                    <Expertise />
                    <Noise position='absolute' />
                </Container>
            </section>
            <Container data-scroll-section as='section' size='lg' id='action-1' >
                <CallToAction />
            </Container>
            <span data-scroll-section className='block h-24 w-full'></span>
            <Container data-scroll-section as='section' size='lg' id={MENU_ITEMS.cases.id} className='py-10 h-fit' >
                <Cases />
            </Container>
            <Container data-scroll-section as='section' size='lg' id='action-contact' >
                <Action />
            </Container>
            <span data-scroll-section className='block h-6 xs:h-12 w-full'></span>
            <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                <Footer />
            </Container>
        </>
    )
}

export default LandingPage;
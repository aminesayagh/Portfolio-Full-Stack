import { Header, Footer } from '@/components/common';
import { Container, Noise } from '@/components/ui';
import { Intro, Manifesto, Cases, Action, Video, Expertise, CallToAction } from '@/components/pages/sections';
import { MENU_ITEMS } from '@/conf/router';
import { twMerge } from 'tailwind-merge';

const LandingPage = () => {
    return (
        <>
            <Container as='section' size='lg' id={MENU_ITEMS.intro.id} >
                <Intro />
            </Container>
            <span className='block h-40 w-full' ></span>
            <Container as='div' size='lg' >
                <Video />
            </Container>
            <span className='block h-18 xxs:h-24 w-full'></span>
            <Container as='section' size='lg' className='py-20' id={MENU_ITEMS.manifesto.id} >
                <Manifesto />
            </Container>
            <span className='block h-24 xxs:h-44 w-full'></span>
            <Container as='section' size='full' id={MENU_ITEMS.experience.id} className='[&>*]:py-20 [&>*]:bg-white-200 relative overflow-hidden' >
                <Expertise />
                <Noise position='absolute' />
            </Container>
            <Container as='section' size='lg' className='' >
                <CallToAction />
            </Container>
            <span className='block h-24 w-full'></span>
            <Container as='section' size='lg' id={MENU_ITEMS.cases.id} className='py-10 overflow-hidden' >
                <Cases />
            </Container>
            <span className='block h-6 xxs:h-10 xs:h-28 w-full'></span>
            <Container as='section' size='lg' >
                <Action />
            </Container>
            <span className='block h-6 xs:h-12 w-full'></span>

            <Container as='footer' size='lg' className={twMerge('flex flex-col gap-8 md:gap-12')}>
                <Footer />
            </Container>
        </>
    )
}

export default LandingPage;
import { Header, Footer } from '@/components/common';
import { Container, Noise } from '@/components/ui';
import { Intro, Manifesto, Cases, Action, Video, Expertise, CallToAction } from '@/components/pages/sections';
import { MENU_ITEMS } from '@/conf/router';

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
            <span className='block h-40 w-full'></span>
            <Container as='section' size='lg' className='py-20' id={MENU_ITEMS.manifesto.id} >
                <Manifesto />
            </Container>
            <span className='block h-60 w-full'></span>
            <Container as='section' size='full' id={MENU_ITEMS.experience.id} className='py-10 [&>*]:py-20 [&>*]:bg-white-200 relative overflow-hidden' >
                <Expertise />
                <Noise position='absolute' />
            </Container>
            <Container as='section' size='lg' className='' >
                <CallToAction />
            </Container>
            <span className='block h-32 w-full'></span>
            <Container as='section' size='lg' id={MENU_ITEMS.cases.id} className='py-10' >
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
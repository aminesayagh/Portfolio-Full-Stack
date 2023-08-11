import { Header, Footer } from '@/components/common';
import { Container } from '@/components/ui';
import { Intro, Manifesto, Cases, Action, Video } from '@/components/pages/sections';



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
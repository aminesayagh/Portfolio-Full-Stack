import { useTranslation } from 'next-i18next'

import { Head, Header } from '@/components/common';
import { Container } from '@/components/ui';
import { Intro, Manifesto, Cases, Action } from '@/components/pages/sections';



const Video = () => {
    return (
        <>
            <video width='100%' height='auto' autoPlay muted loop controls>
                <source src='/video.mp4' type='video/mp4' />
            </video>
        </>
    )
}

const LandingPage = () => {
    return (
        <>
            {/* <Header /> */}
            {/* <Container size='lg' >
                <Intro />
            </Container> */}
            {/* <Container size='lg'>
                <Video />
            </Container>
            <Container size='lg' >
                <Manifesto />
            </Container>
            <Container size='lg' >
                <Cases />
            </Container> */}
            <Container size='lg' >
                <Action />
            </Container>
        </>
    )
}

export default LandingPage;
import { Header, Footer } from '@/components/common';
import { Container } from '@/components/ui';


const ContactPage = () => {
    return (
        <>
            <Header />
            <Container as='section' size='lg' >
                <p>Hello contact</p>
            </Container>
            <Footer />
        </>
    )
}

export default ContactPage;
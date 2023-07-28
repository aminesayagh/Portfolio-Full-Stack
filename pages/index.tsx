
import { useTranslation } from 'next-i18next'
import { Head, Header } from '@/components/common';
import { LandingPage } from '@/components/pages';

import { Container } from '@/components/ui';

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      <Head title={t('head.home.title')}
        description={t('head.home.description')}
        keywords={t('head.home.keywords')}
        author={t('head.home.author')}
        logo='/favicon.svg'
      />
      <Header />
      <Container size='lg' >
        <LandingPage.Intro />
      </Container>
      <Container size='lg' >
        <LandingPage.Manifesto />
      </Container>
      <Container size='lg' >
        <LandingPage.Cases />
      </Container>
      <Container size='lg' >
        <LandingPage.Action />
      </Container>
    </>
  )
}

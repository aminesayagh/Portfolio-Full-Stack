
import { useTranslation } from 'next-i18next'
import { Head } from '@/components/common';
import { LandingPage } from '@/components/pages';
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
      <LandingPage.Intro />
      <LandingPage.Manifesto />
      <LandingPage.Cases />
      <LandingPage.Action />
    </>
  )
}

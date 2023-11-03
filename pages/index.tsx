import Head from '@/components/common/head';
import Noise from '@/components/ui/noise';
import { LoadingProvider } from '@/components/ui/preloader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import '@/utils/gsap';

import Cursor from '@/components/ui/cursor';
import dynamic from 'next/dynamic';

import nextI18NextConfig from '../next-i18next.config.js'
import { useTranslation } from 'next-i18next';

const DynamicHeader = dynamic(() => import('@/components/common/header'), {});
const DynamicLandingPage = dynamic(() => import('@/components/pages/LandingPage'), {});

import AnimationConf from '@/context/AnimationConf';

export default function Home() {
  const { t } = useTranslation('common');

  return <>
    <Head title={t('head.home.title')}
      description={t('head.home.description')}
      keywords={t('head.home.keywords')}
      author={t('head.home.author')}
      logo='/favicon.svg'
    />
    <LoadingProvider>
      <Cursor>
        <DynamicHeader />
        <AnimationConf >
          <DynamicLandingPage />
        </AnimationConf>
        <Noise />
      </Cursor>
    </LoadingProvider>
  </>
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
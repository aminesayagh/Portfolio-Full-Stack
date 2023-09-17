import { Head } from '@/components/common';
import { Suspense } from 'react';
import { Loading, Noise } from 'components/ui';
import { ContactPage } from '@/components/pages';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import '@/utils/gsap';
import AnimationConf from '@/context/AnimationConf';
import ScrollContextProvider from '@/context/ScrollContext';
import { Header } from '@/components/common';
import { ToastRegion } from '@/components/common/toast';


const Contact = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head 
                title={t('head.contact.title')}
                description={t('head.contact.description')}
                keywords={t('head.contact.keywords')}
                author={t('head.contact.author')}
                logo='/favicon.svg'
            />
            <ScrollContextProvider >
                <AnimationConf>
                    <Header />
                    <div data-scroll-container>
                        <ContactPage />
                    </div>
                    <Noise />
                </AnimationConf>
            </ScrollContextProvider>
            <ToastRegion />

        </>
    )
}

import nextI18NextConfig from '../next-i18next.config.js'
import { useTranslation } from 'react-i18next';

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
        },
    };
}

export default Contact;

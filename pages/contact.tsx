import Head from '@/components/common/head';
import Noise  from 'components/ui/noise';
import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import '@/utils/gsap';
import { ToastRegion } from '@/components/common/toast';

import Cursor from '@/components/ui/cursor';
import { LoadingProvider } from '@/components/ui/preloader';

const ContactPageDynamic = dynamic(() => import('@/components/pages/ContactPage'), {});
const HeaderDynamic = dynamic(() => import('@/components/common/header'), {})
const DynamicAnimationConf = dynamic(() => import('@/context/AnimationConf'), {});
const Contact = () => {
    const { t } = useTranslation('common');

    return <>
        <Head
            title={t('head.contact.title')}
            description={t('head.contact.description')}
            keywords={t('head.contact.keywords')}
            author={t('head.contact.author')}
            logo='/favicon.svg'
        />

        <LoadingProvider>
            <Cursor>
                <HeaderDynamic />
                <DynamicAnimationConf >
                    <ContactPageDynamic />
                </DynamicAnimationConf>
                <Noise />
                <ToastRegion />
            </Cursor>
        </LoadingProvider>
    </>
}

import nextI18NextConfig from '../next-i18next.config.js'
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic.js';

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
        },
    };
}

export default Contact;

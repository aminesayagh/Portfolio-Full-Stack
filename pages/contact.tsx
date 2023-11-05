import React from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic.js';

import nextI18NextConfig from '../next-i18next.config.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from '@/components/common/head';
import { ToastRegion } from '@/components/common/toast';
import Noise from 'components/ui/noise';
import Cursor from '@/components/ui/cursor';

import '@/utils/gsap';


const ContactPageDynamic = dynamic(() => import('@/components/pages/ContactPage'), {});
const HeaderDynamic = dynamic(() => import('@/components/common/header'), {});

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
        {/* <LoadingProvider> */}
        <ContactPageDynamic />
        {/* </LoadingProvider> */}
    </>
}


export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
        },
    };
}

export default Contact;

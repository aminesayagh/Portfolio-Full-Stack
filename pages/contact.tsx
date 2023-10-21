import { Head } from '@/components/common';
import { Noise } from 'components/ui';
import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import '@/utils/gsap';
import { ToastRegion } from '@/components/common/toast';
import { Cursor, LoadingProvider } from '@/components/ui';

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
                <DynamicAnimationConf >
                    <HeaderDynamic />
                    <div data-scroll-container>
                        <ContactPageDynamic />
                    </div>
                    <Noise />
                    <ToastRegion />

                </DynamicAnimationConf>
            </Cursor>
        </LoadingProvider>
    </>
}

import nextI18NextConfig from '../next-i18next.config.js'
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic.js';

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
        },
    };
}

export default Contact;

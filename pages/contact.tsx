import { Head } from '@/components/common';
import { Suspense } from 'react';
import { Loading, Noise } from 'components/ui';
import { ContactPage } from '@/components/pages';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import '@/components/InitGsap';


const Contact = () => {
    return (
        <>
            <Head title={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                description={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                keywords="Mohamed Amine SAYAGH - Full Stack Web Developer"
                author="Mohamed Amine SAYAGH"
                logo='/favicon.svg'
            />
            <Suspense fallback={<Loading />}>
                <ContactPage />
                <Noise />
            </Suspense>
        </>
    )
}

import nextI18NextConfig from '../next-i18next.config.js'

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),

        },
    };
}

export default Contact;

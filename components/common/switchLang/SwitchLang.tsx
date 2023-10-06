import React from "react";

import { useTranslation } from "next-i18next";
import { Link, Button } from "@/components/ui";
import i18n from '@/utils/i18n';

import { useRouter } from 'next/router';
const langs = ['fr', 'en'];
import { Item } from '@/components/ui';

const SwitchLang = () => {
    // const { t, i18n } = useTranslation();
    const router = useRouter();
    const changeLanguage = (lng: React.Key) => {
        router.push(router.pathname, router.asPath, { locale: lng as string });
    }

    return (
        <>
            <div className='flex flex-row items-center justify-start gap-6 xxs:gap-8 mdl:gap-6 lg:gap-8'>
                {langs.map(l =>
                    <span key={l} className='overflow-hidden'>
                        <Item defaultColor='var(--color-white-600)'>
                            <Button degree="2" size='xs' className="uppercase" onPress={() => changeLanguage(l)} style={{
                                color: 'inherit'
                            }}>
                                {l}
                            </Button>
                        </Item>
                    </span>
                )}
            </div>
        </>
    )
}

export default SwitchLang;
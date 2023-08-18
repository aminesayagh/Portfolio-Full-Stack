import React from "react";

import { useTranslation } from "next-i18next";
import { Link, Button } from "@/components/ui";

const langs = ['fr', 'en'];
const SwitchLang = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: React.Key) => {
        i18n.changeLanguage(lng.toString());
    }
    const languages = i18n.options?.supportedLngs;

    if (!languages) return null;
    return (
        <>
            <div className='flex flex-row items-center justify-start gap-4 xxs:gap-8 mdl:gap-6 lg:gap-8'>
                {langs.map(l =>
                    <Button key={l} degree="2" size='xs' className="uppercase" onPress={() => changeLanguage(l)} >
                        {l}
                    </Button>
                )}
            </div>
        </>
    )
}

export default SwitchLang;
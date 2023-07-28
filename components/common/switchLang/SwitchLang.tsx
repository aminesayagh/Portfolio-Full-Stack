import React from "react";

import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui";
const SwitchLang = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: React.Key) => {
        i18n.changeLanguage(lng.toString());
    }
    // get list of valid languages from i18n config
    const languages = i18n.options?.supportedLngs;

    if(!languages) return null;
    return (
        <>
            <div>
                {languages.map(l => {
                    return (
                        <>
                            <Button >
                                {l}
                            </Button>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default SwitchLang;
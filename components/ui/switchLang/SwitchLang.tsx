import React from "react";

import { useTranslation } from "next-i18next";

const SwitchLang = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: React.Key) => {
        i18n.changeLanguage(lng.toString());
    }
    return (
        <></>
    )
}

export default SwitchLang;

import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text } from '@/components/ui';



const Manifesto = () => {
    const { t } = useTranslation();
    return (
        <div className={twMerge(`flex flex-col`)} >
            <div>
                <Title h4 degree='2' weight='medium' >
                    {t(``)}
                </Title>
            </div>
        </div>

    )
}

export default Manifesto;
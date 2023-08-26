
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text } from '@/components/ui';



const Manifesto = () => {
    const { t } = useTranslation();
    return (
        <div className={twMerge(`flex flex-col`)} >
            <div className={twMerge('flex flex-col gap-4', 'items-start justify-start')}>
                <Title h4 degree='2' weight='medium' >
                    {t(`manifesto.subtitle`)}
                </Title>
                <span className='inline '>
                    <Title h4 degree='2' weight='semibold' >
                        {t(`manifesto.slogan`)}
                    </Title>
                    <Title h4 degree='2' weight='semibold' >
                        {t(`manifesto.description`)}
                    </Title>
                </span>
                
            </div>
            <div className='flex flex-row gap-12 items-start justify-between'>
                <div className={twMerge()}>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.who_i_am`)}
                    </Text>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.what_i_do`)}
                    </Text>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.action`)}
                    </Text>
                </div>
            </div>
        </div>

    )
}

export default Manifesto;
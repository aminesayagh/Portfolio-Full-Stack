
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Link } from '@/components/ui';



const Manifesto = () => {
    const { t } = useTranslation();
    return (
        <div className={twMerge(`grid grid-cols-12 gap-y-12`)} >
            <div className={twMerge('flex flex-col gap-7', 'items-start justify-start', 'col-start-2 col-span-10')}>
                <Title h6 degree='3' weight='semibold' >
                    {t(`manifesto.subtitle`)}
                </Title>
                <Title h4 degree='2' weight='semibold' >
                    <strong className='text-white-100 pr-2'>
                        {t(`manifesto.slogan`)}
                    </strong>
                    {t(`manifesto.description`)}
                </Title>
            </div>
            <div className={twMerge('flex flex-row gap-12 items-start justify-between', 'col-start-5 col-span-7')}>
                <div className={twMerge('flex flex-col gap-5', '')}>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.who_i_am`)}
                    </Text>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.what_i_do`)}
                    </Text>
                    <Text p degree='2' weight='medium' size='xl' className='' >
                        {t(`manifesto.goal`)}
                        <Link degree='1' weight='semibold' size='xl' href='/contact' className='ml-4' >
                            {t(`manifesto.action`)}
                        </Link>
                    </Text>
                </div>
            </div>
        </div>

    )
}

export default Manifesto;
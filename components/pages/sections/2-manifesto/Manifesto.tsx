
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Link } from '@/components/ui';



const Manifesto = () => {
    const { t } = useTranslation();
    return (
        <div className={twMerge(`grid grid-cols-12 gap-y-12`, '')} >
            <div className={twMerge('flex flex-col gap-7', 'items-start justify-start', 'col-start-2 col-span-9')}>
                <div className='flex flex-row gap-5 justify-center items-center'>
                    <Title h6 degree='4' weight='medium' >
                        {t(`manifesto.subtitle_1`)}
                    </Title>
                    <div className={twMerge('w-[0.3rem] h-[0.3rem] rounded-full bg-gray-500 items-center justify-start')} ></div>
                    <Title h6 degree='4' weight='medium' >
                        {t(`manifesto.subtitle_2`)}
                    </Title>
                </div>
                <Title h4 degree='2' weight='semibold' >
                    <strong className='text-white-200 pr-2'>
                        {t(`manifesto.slogan`)}
                    </strong>
                    {t(`manifesto.description`)}
                </Title>
            </div>
            <div className={twMerge('flex flex-row gap-12 items-start justify-between', 'col-start-5 col-span-6')}>
                <div className={twMerge('flex flex-col gap-5', '')}>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.who_i_am`)}
                    </Text>
                    <Text p degree='2' weight='medium' size='lg' >
                        {t(`manifesto.what_i_do`)}
                    </Text>
                    <Text p degree='2' weight='medium' size='xl' className='' >
                        {t(`manifesto.goal`)}
                        <Link degree='1' href='/contact' className='ml-2' >
                            {t(`manifesto.action`)}
                        </Link>
                    </Text>
                </div>
            </div>
        </div>

    )
}

export default Manifesto;
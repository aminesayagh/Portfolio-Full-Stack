
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Link } from '@/components/ui';



const Manifesto = () => {
    const { t } = useTranslation();
    return (
        <div className={twMerge(`grid grid-cols-12 gap-y-4 xxs:gap-y-5 xs:gap-y-8 mdl:gap-y-12`)} >
            <div className={twMerge('flex flex-col gap-7', 'items-start justify-start', 
                'col-start-1 col-span-12 xs:col-start-2 xs:col-span-11 md:col-start-2 md:col-span-10 mdl:col-start-2 mdl:col-span-10 xl:col-start-2 xl:col-span-9'
            )}>
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
            <div className={twMerge(
                'flex flex-row gap-12 items-start justify-between', 
                'mr-7 xl:mr-6 2xl:mr-0',
                'col-start-1 col-span-12 xxs:col-start-2 xxs:col-span-11 xs:col-start-2 xs:col-span-10 sm:col-start-4 sm:col-span-9 md:col-start-5 md:col-span-7 lg:col-start-6 lg:col-span-6 xl:col-start-6 xl:col-span-5'
            )}>
                <div className={twMerge('flex flex-col gap-5', '')}>
                    <Text p degree='3' weight='medium' size='lg' >
                        {t(`manifesto.who_i_am`)}
                    </Text>
                    <Text p degree='3' weight='medium' size='lg' >
                        {t(`manifesto.what_i_do`)}
                    </Text>
                    <Text p degree='3' size='xl' weight='semibold' className='textLink inline w-full whitespace-inherit-important ' style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }} >
                        {t(`manifesto.goal`)}
                        <Link degree='2' href='/contact' className='ml-2' weight='bold' >
                            {t(`manifesto.action`)}
                        </Link>
                    </Text>
                    <style jsx>{`
                        .textLink {
                            
                            text-wrap: inherit !important;
                        }
                    `}</style>
                </div>
            </div>
        </div>

    )
}

export default Manifesto;
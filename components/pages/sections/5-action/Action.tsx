

import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';

import { Text, Display, Link } from '@/components/ui';


const Action = () => {
    const { t } = useTranslation()
    return <>
        <div className={twMerge('flex flex-col gap-1 xs:gap-2 sm:gap-6', 'justify-start xs:justify-center items-start xs:items-center place-content-start', 'h-[64vh]')} >
            <Display size='lg' className={twMerge('uppercase text-start xs:text-center')} >
                {t('contactCall.title')}
            </Display>
            <div className='flex flex-row justify-start xs:justify-center items-start relative'>
                <Link href='/contact' >
                    <Display size='lg' weight='bold' className={twMerge('whitespace-nowrap-important uppercase text-primary-500')} >
                        {t('contactCall.action')}
                    </Display>
                </Link>
                <Text p degree='3' size='xxs' weight='medium' className={twMerge(
                    'absolute',
                    'left-[-1.5%] xs:left-auto sm:left-[103%]',
                    'top-[100%] sm:top-[-6px]',
                    'xs:right-[-1%] md:right-auto', // right
                    'mt-3 xl:mt-4', // margin top
                    'ml-2 w-32 xl:w-40 4xl:w-52', // width
                    'text-start xs:text-end sm:text-start' // text alignment
                )} >
                    {t('contactCall.description')}
                </Text>
            </div>
        </div>
    </>
}

export default Action;


import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';

import { Title, Text, Display } from '@/components/ui';

const Action = () => {
    const { t } = useTranslation()
    return <>
        <div className={twMerge('flex flex-col gap-6', 'justify-center items-center place-content-start', 'h-[64vh]')} >
            <Display size='lg' className={twMerge('uppercase')} >
                {t('contactCall.title')}
            </Display>
            <div className='flex flex-row justify-center items-start relative'>
                <Display size='lg' weight='bold'  className={twMerge('uppercase text-primary-500')} >
                    {t('contactCall.action')}
                </Display>
                <Text p degree='3' size='xs' weight='medium' className={twMerge('absolute left-[103%] top-[-6px] ml-2 mt-4 w-52')} >
                    {t('contactCall.description')}
                </Text>
            </div>
        </div>
    </>
}

export default Action;


import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';

import { Title, Text, Display } from '@/components/ui';

const Action = () => {
    const { t } = useTranslation()
    return <>
        <div className={twMerge('flex flex-col gap-6')} >
            <Display size='lg' className={twMerge('uppercase')} >
                {t('contactCall.title')}
            </Display>
            <div className='flex flex-row justify-center items-start'>
                <Display size='lg' weight='bold'  className={twMerge('uppercase text-primary-500')} >
                    {t('contactCall.action')}
                </Display>
                <Text p degree='3' size='sm' weight='medium' className={twMerge('ml-2')} >
                    {t('contactCall.content')}
                </Text>
            </div>
        </div>
    </>
}

export default Action;
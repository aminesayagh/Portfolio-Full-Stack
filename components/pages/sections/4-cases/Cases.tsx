import { twMerge } from 'tailwind-merge';

import { Title, Text } from '@/components/ui';
import { useTranslation } from 'next-i18next';

const Cases = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className={twMerge('grid grid-cols-12')}>
                <div className={twMerge('col-start-9 col-span-4', 'flex flex-col gap-8', 'w-min')}>
                    <Title h1 weight='bold' degree='2' className={'w-fit'}>
                        {t('cases.title')}
                    </Title>
                    <Text p size='md' degree='3' weight='semibold' className='w-fit mr-6' >
                        {t('cases.description')}
                    </Text>
                </div>
                
            </div>
        </>
    )
}

export default Cases;
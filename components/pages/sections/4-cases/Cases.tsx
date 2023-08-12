import { twMerge } from 'tailwind-merge';

import { Title, Text } from '@/components/ui';
import { useTranslation } from 'next-i18next';

const Cases = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className={twMerge('grid grid-cols-12')}>
                <div>
                    <Title h2 weight='bold' degree='2'>
                        {t('cases.title')}
                    </Title>
                    <Text p size='sm' degree='3' weight='semibold' >
                        {t('cases.description')}
                    </Text>
                </div>
                
            </div>
        </>
    )
}

export default Cases;
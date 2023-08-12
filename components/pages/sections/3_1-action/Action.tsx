import { useTransition } from "react";
import { useTranslation } from "next-i18next";
import { Text, Button, Icon } from '@/components/ui';

import { twMerge } from 'tailwind-merge';

const Action = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className={twMerge('flex flex-row justify-between items-end', 'py-12')}>
                <div className='w-auto'>
                    <Button size='sm' className='border rounded-full' >
                        {t('motivation.action')}
                    </Button>
                    <Button >
                        <Icon name='IconArrowUpRight' size='20' className='stroker-white-100' />
                    </Button>
                </div>
                <div className={twMerge('flex flex-col gap-4', 'w-5/12')} >
                    <Text p degree="3" weight='semibold' size='md' >
                        {t('motivation.content.1')}    
                    </Text> 
                    <Text p degree='3' weight='semibold' size='md' >
                        {t('motivation.content.2')}
                    </Text>
                </div>
            </div>
        </>
    )
}

export default Action;
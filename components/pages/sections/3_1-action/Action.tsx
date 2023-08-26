import { useTranslation } from "next-i18next";
import { Text, Button, Icon } from '@/components/ui';

import { twMerge } from 'tailwind-merge';

const Action = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className={twMerge('flex flex-col sm:flex-row justify-between items-start sm:items-end', 'gap-8 sm:gap-0', 'py-12')}>
                <div className={twMerge('w-auto flex flex-row items-center justify-start', 'order-2 md:order-1')}>
                    <Button size='sm' className='border rounded-full py-4 px-6' degree='2' >
                        {t('motivation.action')}
                    </Button>
                    <Button className='border rounded-full p-4'>
                        <Icon name='IconArrowUpRight' size='22' className='stroke-white-100 stroke-[2px]' />
                    </Button>
                </div>
                <div className={twMerge('flex flex-col gap-4', 'w-full xxs:w-11/12 xs:w-10/12 sm:w-7/12 lg:w-1/2 xl:w-4/12', 'order-1 md:order-2')} >
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
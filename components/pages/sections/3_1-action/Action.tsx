import { useTranslation } from "next-i18next";

import Text from '@/components/ui/typography/Text';
import Button from '@/components/ui/button';
import {Icon} from '@/components/ui/icon';

import { twMerge } from 'tailwind-merge';
import useRouterChange from '@/hook/SafePush';

const Action = () => {
    const { safePush } = useRouterChange();

    const { t } = useTranslation();
    const goToContact = () => {
        safePush('/contact');
    }
    return (
        <>
            <div
                data-scroll
                className={twMerge(
                    'flex flex-col md:flex-row justify-between items-start md:items-end',
                    'gap-8 md:gap-0',
                    'py-12'
                )}>
                <div className={twMerge('w-auto flex flex-row items-center justify-start', 'order-2 md:order-1')}>
                    <Button size='sm' className='border rounded-full py-4 px-6' degree='2' onPress={goToContact} >
                        {t('motivation.action')}
                    </Button>
                    <Button className='border rounded-full p-4' title={t('motivation.action')} name='button action icon' onPress={goToContact}>
                        <Icon name='IconArrowUpRight' size='22' className='stroke-white-100 stroke-[1.2px] lg:stroke-[2px]' />
                    </Button>
                </div>
                <div className={twMerge('flex flex-col sm:flex-row md:flex-col gap-4 sm:gap-16 md:gap-4',
                    'w-full xxs:w-11/12 xs:w-10/12 sm:w-full md:w-6/12 lg:w-5/12 xl:w-4/12',
                    'order-1 md:order-2'
                )} >
                    <Text p degree="3" weight='semibold' size='md' className='w-full sm:w-1/2 md:w-full' >
                        {t('motivation.content.1')}
                    </Text>
                    <Text p degree='3' weight='semibold' size='md' className='w-full sm:w-1/2 md:w-full' >
                        {t('motivation.content.2')}
                    </Text>
                </div>
            </div>
        </>
    )
}

export default Action;
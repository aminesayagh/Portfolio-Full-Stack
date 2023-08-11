import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Text, Icon } from '@/components/ui';

const FollowUs = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Text p degree='3' weight='semibold' size='md' >
                {t('footer.socialNetwork')}
            </Text>
            <Icon name='IconShare' size='20' className='stroker-white-100' />
        </div>
    )
}

const Footer = () => {
    const { t } = useTranslation();
    return (<>
        <div className={twMerge('flex flex-col gap-4')}>
            <div className={twMerge('')} >
                <Text p degree='3' weight='semibold' size='lg' >
                    {t('footer.state')}
                </Text>
            </div>
            <div className={twMerge('flex flex-row justify-between')}>
                <div className={twMerge('flex flex-row')} >

                </div>  
                <div className='flex flex-row justify-center items-center'>
                    <Text p degree='3' weight='semibold' size='md'>
                        {t('footer.name')}
                    </Text>
                    <Text p degree='3' weight='semibold' size='md' className={twMerge('ml-2')} >
                        {t('footer.copy')}
                    </Text>
                </div>
                <div>
                    <FollowUs />
                </div>
            </div>
        </div>
    </>)
}

export default Footer;
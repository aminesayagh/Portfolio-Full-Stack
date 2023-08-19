import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Image } from '@/components/ui';
import { useTranslation } from 'next-i18next';
import { getProjectsByCategory } from '@/conf/projects';
import { rounded, blurCard } from '@/components/style';

const blurButton = twMerge('backdrop-blur-xl', 'border border-white-100/20 bg-white-100/[0.05]')
const ListProject = () => {
    const { t } = useTranslation('projects');
    const listProject = useMemo(() => getProjectsByCategory('best'), [])

    return (
        <ul className={twMerge('flex flex-col','gap-8 xl:gap-12')}>
            {listProject.map((project, index) => {
                if (!project['picture']) return null;
                return (
                    <div key={index} className='relative rounded-lg sm:rounded-2xl overflow-hidden'>
                        <Image src={project['picture'][0]} alt={t(`projects.${project.id}.alt`)} width={1920} height={720} className='h-[60vh] sm:h-[80vh] md:h-[110vh] object-cover' />
                        <div className={twMerge('absolute w-full h-60', 'left-0 bottom-0','bg-gradient-to-t from-black-100/40 to-black-100/0')}></div>
                        <div className={twMerge('absolute left-0 right-0 bottom-0 m-0 sm:m-7 lg:m-10 xl:m-14','gap-4', 'flex flex-col md:flex-row items-start md:items-end justify-between')}>
                            <div className={twMerge('w-full sm:w-10/12 md:w-7/12 lg:w-1/2 xl:w-5/12', 'order-2 md:order-1', 'sm:rounded-xl', 'backdrop-blur-xl', 'border-t sm:border  border-white-100/20 bg-white-100/[0.05]')}>
                                <div className={twMerge('flex flex-col items-start justify-start', 'p-7 mdl:p-8')}>
                                    <Title h4 weight='bold' degree='1' className='flex' >
                                        {t(`projects.${project.id}.title`)}
                                    </Title>
                                    <Text p size='sm' degree='2' weight='semibold' className='hidden sm:flex line-clamp-3 w-full py-4' >
                                        {t(`projects.${project.id}.description`)}
                                    </Text>
                                </div>
                            </div>
                            <div className={twMerge('w-10/12 md:w-5/12 lg:w-4/12 2xl:w-3/12', 'order-1 md:order-2','hidden md:flex flex-row flex-wrap gap-2', 'justify-start md:justify-end lg:justify-start')}>
                                {project.tasks.map((task, index) => {
                                    return <div key={index} className={twMerge(blurCard({ color: 'white' }),'p-1', rounded({ size: 'lg' }))}>
                                        <Text degree='2' size='xs' li className='p-1 uppercase'>
                                            {t(`tasks.${task}`)}
                                        </Text>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </ul>
    )
}

const Cases = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className={twMerge('flex flex-col gap-14 sm:gap-12 w-full')}>
                <div className={twMerge('flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-12', 'w-full')}>
                    <Title h2 weight='bold' degree='2' className={'sm:w-min'}>
                        {t('cases.title')}
                    </Title>
                    <Text p size='md' degree='3' weight='semibold' className='w-auto max-w-[38rem] sm:max-w-[30rem] my-4' >
                        {t('cases.description')}
                    </Text>
                </div>
                <ListProject />

            </div>
        </>
    )
}

export default Cases;
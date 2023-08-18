import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Image } from '@/components/ui';
import { useTranslation } from 'next-i18next';
import { getProjectsByCategory } from '@/conf/projects';

const ListProject = () => {
    const { t } = useTranslation('projects');
    const listProject = useMemo(() => getProjectsByCategory('best'), [])

    return (
        <ul className='flex flex-col gap-20'>
            {listProject.map((project, index) => {
                if (!project['picture']) return null;
                return (
                    <div key={index} className='relative rounded-2xl overflow-hidden'>
                        <Image src={project['picture'][0]} alt={t(`projects.${project.id}.alt`)} width='1920' height='720' />
                        <div className={twMerge('absolute left-0 right-0 bottom-0 m-14', 'flex flex-row items-end justify-between')}>
                            <div>
                                <Title h4 weight='bold' degree='2' >
                                    {t(`projects.${project.id}.title`)}
                                </Title>
                                <Text p size='md' degree='2' weight='semibold' className='line-clamp-3 w-full py-4' >
                                    {t(`projects.${project.id}.description`)}
                                </Text>
                            </div>
                            <div>
                                {project.tasks.map((task, index) => {
                                    return <Text key={index} degree='2' size='sm' li >
                                        {t(`tasks.${task}`)}
                                    </Text>
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
            <div className={twMerge('flex flex-col gap-12 w-full')}>
                <div className={twMerge('flex flex-row justify-between items-end gap-12', 'w-full')}>
                    <Title h2 weight='bold' degree='2' className={'w-min'}>
                        {t('cases.title')}
                    </Title>
                    <Text p size='md' degree='3' weight='semibold' className='w-auto max-w-[30rem] my-4' >
                        {t('cases.description')}
                    </Text>
                </div>
                <ListProject />

            </div>
        </>
    )
}

export default Cases;
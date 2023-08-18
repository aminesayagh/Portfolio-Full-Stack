import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Image } from '@/components/ui';
import { useTranslation } from 'next-i18next';
import { getProjectsByCategory } from '@/conf/projects';

const Cases = () => {
    const { t } = useTranslation()
    const listProject = useMemo(() => getProjectsByCategory('best'), [])
    return (
        <>
            <div className={twMerge('flex flex-col gap-4 w-full')}>
                <div className={twMerge('flex flex-row justify-between gap-8', 'w-full')}>
                    <Title h2 weight='bold' degree='2' className={'w-min'}>
                        {t('cases.title')}
                    </Title>
                    <div className='flex flex-col justify-end items-end'>
                        <Text p size='md' degree='3' weight='semibold' className='line-clamp-3 w-full py-4' >
                            {t('cases.description')}
                        </Text>
                    </div>
                </div>
                <div>
                    {listProject.map((project, index) => {
                        if(!project['picture']) return null;
                        return (
                        <div key={index}>
                            <div className='flex'>
                                <Image src={project['picture'][0]} alt={t(`projects.${project.id}.alt`)} width='1920' height='800' />
                                <div className='absolute left-0 right-0 bottom-0 m-14'>
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

                        </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Cases;
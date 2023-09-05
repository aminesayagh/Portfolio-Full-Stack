import { useMemo, useLayoutEffect, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';
import { Title, Text, Image } from '@/components/ui';
import { useTranslation } from 'next-i18next';
import { getProjectsByCategory } from '@/conf/projects';
import { rounded, blurCard } from '@/components/style';
import { useIsomorphicEffect } from '@/hook';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
const blurButton = twMerge('backdrop-blur-xl', 'border border-white-100/20 bg-white-100/[0.05]')


const Cases = () => {
    const { t } = useTranslation();
    const projects = useMemo(() => getProjectsByCategory('best'), []);
    const containerRef = useRef<HTMLDivElement>(null);
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.utils.toArray('.image_gsap').forEach((box) => {
                gsap.fromTo(box as any, {
                    backgroundSize: '100%',
                    backgroundPosition: 'center 10%',
                }, {
                    backgroundSize: '110%',
                    backgroundPosition: 'center 80%',
                    ease: 'power1',
                    scrollTrigger: {
                        trigger: box as any,
                        scrub: 1,
                        start: 'top center',
                        markers: false,
                    }
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current as any,
                    start: 'top top',
                    end: '+=4000',
                    scrub: true,
                    pin: containerRef.current as any,
                    anticipatePin: 1,
                    markers: true,
                }
            });
            tl.to('.image_gsap_0', { yPercent: 100 })
                .to('.image_gsap_1', { yPercent: -100 })
                .to('.image_gsap_2', { yPercent: -100 })
        }, containerRef);
        return () => ctx.revert();
    }, []);
    return (
        <>
            <div className={twMerge('flex flex-col gap-14 sm:gap-12 w-full')}>
                <div className={twMerge('flex flex-col sm:flex-row justify-between items-start sm:items-end', 'gap-2 sm:gap-12', 'w-full')}>
                    <Title h2 weight='bold' degree='2' className={'sm:w-min'}>
                        {t('cases.title')}
                    </Title>
                    <div className='w-full xs:w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12'>
                        <Text p size='md' degree='3' weight='semibold' className='w-auto max-w-[38rem] sm:max-w-[36rem] my-2 md:my-4' >
                            {t('cases.description')}
                        </Text>
                    </div>
                </div>
                <div className={twMerge('flex flex-col h-fit w-full')} ref={containerRef} >
                    {projects.map((project, index) => {
                        return <div key={index} className={twMerge(
                            'flex flex-col items-center justify-center',
                            'bg-center bg-no-repeat bg-cover',
                            'h-screen w-full',
                            'image_gsap',
                            `image_gsap_${index}`
                        )} style={{
                            backgroundImage: `url(${project?.picture ? project?.picture[0] : ''})`,
                        }}>
                            <Title h4 weight='bold' degree='1' className='flex' >
                                {t(`projects.${project.id}.title`)}
                            </Title>
                            {/* <Image priority src={project?.picture ? project?.picture[0] : ''} alt={t(`projects.${project.id}.alt`)} width={1920} height={720} className='h-[60vh] sm:h-[80vh] md:h-[110vh] object-cover' /> */}
                            {/* <div className={twMerge('w-full h-60', 'absolute left-0 bottom-0', 'bg-gradient-to-t from-black-100/40 to-black-100/0')}></div> */}
                            {/* <div className={twMerge('absolute left-0 right-0 bottom-0 m-0 sm:m-7 lg:m-10 xl:m-14', 'gap-4', 'flex flex-col md:flex-row items-start md:items-end justify-between')}>
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
                                <ul className={twMerge('w-10/12 md:w-5/12 lg:w-4/12 2xl:w-3/12', 'order-1 md:order-2', 'hidden md:flex flex-row flex-wrap gap-2', 'justify-start md:justify-end lg:justify-start')}>
                                    {project.tasks.map((task, index) => {
                                        return <li key={index} className={twMerge(blurCard({ color: 'white' }), 'p-1', rounded({ size: 'lg' }))}>
                                            <Text degree='2' size='xs' p className='p-1 uppercase'>
                                                {t(`tasks.${task}`)}
                                            </Text>
                                        </li>
                                    })}
                                </ul>
                            </div> */}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Cases;
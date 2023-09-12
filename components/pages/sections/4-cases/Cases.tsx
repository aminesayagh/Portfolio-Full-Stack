import { useMemo, useRef, useContext, useLayoutEffect, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Title, Text } from '@/components/ui';

import { useTranslation } from 'next-i18next';
import { ScrollProvider } from '@/context/ScrollContext';
import { getProjectsByCategory } from '@/conf/projects';
import { gsap } from 'gsap';

const Case = ({ picture, index, id }: { picture?: string[], index: number, id: string }) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollbar } = useContext(ScrollProvider);
    const { t } = useTranslation();

    useEffect(() => {
        const ctx = gsap.context((self) => {
            // gsap.set(container.current, {
            //     zIndex: 100 - (index + 10)
            // });
            if(index < 2) {
                gsap.fromTo(container.current?.children[0] as any, {
                    top: 0,
                },{
                    top: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container.current as any,
                        scrub: true,
                        start: 'top top',
                        end: 'bottom top',
                        toggleActions: 'play none reverse none',
                        markers: false,
                        invalidateOnRefresh: true,
                    }
                })
            }else {
                gsap.fromTo(container.current?.children[0] as any, {
                    top: 0,
                },{
                    top: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container.current as any,
                        scrub: true,
                        start: 'top top',
                        end: 'bottom top',
                        toggleActions: 'play none reverse none',
                        markers: false,
                        invalidateOnRefresh: true,
                    }
                })
            }
            gsap.fromTo(container.current?.children[0] as any, {
                backgroundSize: '100%',
                backgroundPosition: 'center 60%',
            }, {
                backgroundSize: '105%',
                backgroundPosition: 'center 20%',
                ease: 'power4',
                scrollTrigger: {
                    trigger: container.current as any,
                    scrub: true,
                    start: 'top bottom',
                    markers: false,
                    invalidateOnRefresh: true,
                }
            })
            // @ts-ignore
            const text = self?.selector('.case-title-gsap, .case-text-gsap');
            if(text) {
                gsap.set(text as any, {
                    xPercent: -100,
                });
                gsap.from(text as any, {
                    xPercent: -100,
                    duration: 1.6,
                    stagger: 0.4,
                    ease: 'power4',
                    scrollTrigger: {
                        trigger: text as any,
                        scrub: true,
                        start: 'top bottom-=35%',
                        end: 'bottom center',
                        markers: false,
                        invalidateOnRefresh: true,
                    }
                })
            }

        }, container);
        return () => {
            ctx.revert();
        }
    }, [scrollbar])
    return <div className={twMerge('relative h-[110vh]')} ref={container}>
    <div className='absolute left-0 right-0 w-full h-screen bg-no-repeat bg-cover' style={{
            backgroundImage: `url(${!!picture ? picture[0] : ''})`,
            zIndex: 10 + (index + 10),
        }} >
            <div className='relative w-fit flex flex-col justify-end h-full px-24 py-40 gap-4 z-20' style={{
                zIndex: 10 + (index + 10),
            }}>

                <span className='overflow-hidden' data-scroll data-scroll-position='end' data-scroll-speed='1'>
                    <Title h1 degree='1' className='case-title-gsap' >
                        {t(`projects.${id}.title`)}
                    </Title>
                </span>
                <span className='overflow-hidden w-1/2' data-scroll data-scroll-position='end' data-scroll-speed='1'>
                    <Text p size='md' degree='2' className='case-text-gsap'>
                        {t(`projects.${id}.description`)}
                    </Text>
                </span>
            </div>
            <div className={twMerge('absolute left-0 right-0 bottom-0 w-full h-60', 'bg-gradient-to-t from-black-100 to-black-100/0')} style={{
                zIndex: 10 + (index + 11),
            }}></div>
        </div>
    </div>
}
const Cases = () => {
    const { t } = useTranslation();
    const { scrollbar } = useContext(ScrollProvider);
    const projects = useMemo(() => getProjectsByCategory('best'), []);
    const container = useRef<HTMLDivElement>(null);

    return <div className={twMerge('flex flex-col gap-14 sm:gap-12 w-full h-fit')} >
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
        <div className={twMerge(`w-full flex flex-col gap-0 h-fit`, 'rounded-2xl overflow-hidden')}>
            {projects.map((project, index) => {
                return <Case key={index} picture={project?.picture} index={index} id={project.id} />
            })}
        </div>
    </div>
}

export default Cases;
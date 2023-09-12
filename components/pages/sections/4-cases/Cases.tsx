import { useMemo, useRef, useContext, useLayoutEffect, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Title, Text } from '@/components/ui';

import { useTranslation } from 'next-i18next';
import { ScrollProvider } from '@/context/ScrollContext';
import { getProjectsByCategory } from '@/conf/projects';
import { gsap } from 'gsap';
import { motion, useAnimation, useScroll, useTransform, ForwardRefComponent, HTMLMotionProps } from 'framer-motion';
const Case = ({ picture, id }: { picture?: string[], id: number }) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollbar } = useContext(ScrollProvider);
    // const { scrollYProgress } = useScroll({
    //     target: container,
    //     offset: ['start end', 'end end']
    // });
    // const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if(id < 2) {
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
        });
        return () => {
            ctx.revert();
        }
    }, [scrollbar])
    return <motion.div className='relative h-screen' ref={container}>
        <motion.div className='absolute left-0 right-0 w-full h-full bg-no-repeat bg-cover' style={{
            backgroundImage: `url(${!!picture ? picture[0] : ''})`,
        }} >
            
        </motion.div>
    </motion.div>
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
        <div className={twMerge(`w-full flex flex-col gap-0 h-fit`)}>
            {projects.map((project, index) => {
                return <Case key={index} picture={project?.picture} id={index} />
            })}
        </div>
    </div>
}

export default Cases;
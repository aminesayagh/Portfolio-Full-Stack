import { useMemo, useRef, useContext, useLayoutEffect, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useTranslation } from 'next-i18next';
import { gsap } from 'gsap';

import { Title, Text } from '@/components/ui';
import { getProjectsByCategory } from '@/conf/projects';
import { ScrollProvider } from '@/context/ScrollContext';

const Case = ({ picture }: { picture?: string[] }) => {
    let ref = useRef<HTMLDivElement>(null);
    const { scrollbar } = useContext(ScrollProvider)
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current as any,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    markers: true,
                    toggleActions: 'play none reverse none',
                    invalidateOnRefresh: true,
                }
            });
            tl.fromTo(ref.current as any, {
                backgroundSize: '100%',
                // backgroundPosition: 'center 10%',
            }, {
                backgroundSize: '105%',
                // backgroundPosition: 'center 80%',
                ease: 'power1',
                scrollTrigger: {
                    trigger: ref.current as any,
                    scrub: 1,
                    start: 'top bottom',
                    markers: false,
                }
            }).fromTo(ref.current as any, {
                backgroundPosition: 'center 90%',
            }, {
                backgroundPosition: 'center 10%',
                ease: 'power1',
                scrollTrigger: {
                    trigger: ref.current as any,
                    scrub: 1,
                    start: 'top bottom',
                    markers: false,
                }
            });
        }, ref);
        return () => ctx.revert();
    }, [ref.current]);
    const [top, setTop ] = useState(0);
    useEffect(() => {
        const onScroll = (e: any) => {
            console.log(e.offset.y);
            const topRef = ref.current?.getBoundingClientRect().top;
            if(!topRef || topRef < 0) return;
            setTop(e.offset.y - topRef);
        }
        if(!!scrollbar) {
            scrollbar.addListener(onScroll);
            return () => scrollbar.removeListener(onScroll);
        }
    }, [scrollbar]);
    return <div
        className={twMerge(
            'flex flex-col items-center justify-center',
            'bg-no-repeat bg-cover',
            'h-[120vh] w-full',
            'left-0 right-0 top-0',
            'image_gsap',
        )}
        ref={ref}
        style={{
            backgroundImage: `url(${!!picture ? picture[0] : ''})`,
            backgroundSize: '100%',
            top: top
        }}
    >
        
    </div>
} 
const Cases = () => {
    const { t } = useTranslation();
    const projects = useMemo(() => getProjectsByCategory('best'), []);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            gsap.set('.image_gsap_container', {
                zIndex: (i, target, targets) => targets.length - i,
            })

            let images = gsap.utils.toArray('.image_gsap_container');
            images.forEach((image, i) => {
                // let tl = gsap.timeline({
                //     scrollTrigger: {
                //         trigger: image as any,
                //         start: () => 'top top',
                //         end: () => '+=' + window.innerHeight,
                //         scrub: true,
                //         markers: true,
                //         toggleActions: 'play none reverse none',
                //         invalidateOnRefresh: true,
                //     }
                // });
                // tl.to(image as any, { height: 0 })
            })
        });
        return () => ctx.revert();
    }, [containerRef.current]);
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
                <div className={twMerge('w-full')} ref={containerRef} >
                    {projects.map((project, index) => {
                        return <div key={index} className={twMerge(
                            'w-full', 'overflow-hidden',
                            'h-[120vh] relative',
                            `image_gsap_container`
                        )} >
                            <Case picture={project?.picture} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Cases;
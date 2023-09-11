import { useMemo, useRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useTranslation } from 'next-i18next';
import { gsap } from 'gsap';

import { Title, Text, Image } from '@/components/ui';
import { getProjectsByCategory } from '@/conf/projects';
import { ScrollProvider } from '@/context/ScrollContext';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Case = ({ picture }: { picture?: string[] }) => {
    let ref = useRef(null);
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // gsap.fromTo(ref.current as any, {
            //     backgroundSize: '100%',
            //     backgroundPosition: 'center 20%',
            // }, {
            //     backgroundSize: '110%',
            //     backgroundPosition: 'center 80%',
            //     ease: 'power1',
            //     scrollTrigger: {
            //         trigger: ref.current as any,
            //         // scrub: 1,
            //         // start: 'top center',
            //         markers: false,
            //     }
            // })
        }, ref);
        return () => ctx.revert();
    }, [ref.current]);

    return <div
        className={twMerge(
            'flex flex-col items-center justify-center',
            'bg-no-repeat bg-cover',
            'h-screen w-full',
            'image_gsap',
        )}
        ref={ref}
        style={{
            backgroundImage: `url(${!!picture ? picture[0] : ''})`,
            backgroundSize: '100%',
        }}
    >

    </div>
}
const Cases = () => {
    const { t } = useTranslation();
    const projects = useMemo(() => getProjectsByCategory('best'), []);
    const containerRef = useRef<HTMLDivElement>(null);
w
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            gsap.set('.image_gsap_container', {
                zIndex: (i, target, targets) => targets.length - i,
            });
            gsap.utils.toArray('.image_gsap_container').forEach((container, index) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container as any,
                        pin: container as any,
                        markers: false,
                        pinSpacing: true,
                        start: 'top top',
                        end: 'bottom -=100%',
                        scrub: true,
                    }
                });
            });
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
                <div className={twMerge('w-full relative', 'flex flex-col gap-0')} ref={containerRef} >
                    {projects.map((project, index) => {
                        return <div key={index} className={twMerge(
                            'w-full',
                            'flex flex-col',
                            `image_gsap_container`
                        )}  >
                            <Case picture={project?.picture} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Cases;


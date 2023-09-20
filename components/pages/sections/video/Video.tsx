import { useRef, useLayoutEffect, useState, useEffect, useContext } from 'react'
import { gsap } from '@/utils/gsap';

import { twMerge } from 'tailwind-merge';

import { rounded } from '@/components/style';
import ImageUi from 'next/image';

import { useIsomorphicLayoutEffect, useMedia } from 'react-use'
import useGsap from '@/hook/useGsap';
const Video = () => {

    let refContainer = useRef<HTMLDivElement>(null);
    const isLg = useMedia('(min-width: 1024px)', true);
    const isSM = useMedia('(min-width: 640px)', false);
    const isXxs = useMedia('(min-width: 390px)', false);

    const [height, setHeight] = useState<string>('50vh');
    const [maxHeight, setMaxHeight] = useState<string>('1100px');
    const [frame, setFrame] = useState<number>(1);
    useEffect(() => {
        if (isLg) {
            setHeight('100vh');
        } else if (isSM) {
            setHeight('96vh');
        } else if (isXxs) {
            setHeight('100vh');
        } else {
            setHeight('70vh');
        }
    }, [isLg, isSM, isXxs])
    useGsap(() => {
        const myCountObj = { number: 1 };
        gsap.to(myCountObj, {
            duration: 0.1,
            ease: 'none',
            number: 164,
            scrollTrigger: {
                trigger: '.video_gsap',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
                markers: false,
            },
            onUpdate: () => {
                setFrame(myCountObj.number++);
            }
        })
    }, refContainer, [frame]);
    useGsap(() => {
        gsap.fromTo('.video_gsap', {
            opacity: 0,
        }, {
            opacity: 1,
            ease: 'power4',
            duration: 0.5,
            scrollTrigger: {
                trigger: '.video_gsap',
            }
        })
    }, refContainer)
    useEffect(() => {
        console.log(frame)
    }, [frame])
    return (
        <>
            <div ref={refContainer} className={twMerge('block relative w-full h-fit rounded-3xl video_gsap overflow-hidden', rounded({ size: 'xl' }))}>
                <ImageVideo frame={frame} />
            </div>
        </>
    )
}

const ImageVideo = ({ frame  }: { frame: number }) => {
    return <ImageUi src={`/framer-image/ezgif-frame-${frame.toString().padStart(3, '0')}.jpg`} alt='video' width={1488} height={1100} className='w-full h-full object-cover' />
}

export default Video;
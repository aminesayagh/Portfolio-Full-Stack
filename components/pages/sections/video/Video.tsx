import { useRef, useLayoutEffect, useState, useEffect, useContext } from 'react'
import { gsap } from '@/utils/gsap';

import { twMerge } from 'tailwind-merge';

import { rounded } from '@/components/style';
import { ScrollProvider } from '@/context/ScrollContext';

import { useIsomorphicLayoutEffect, useMedia } from 'react-use'
import useGsap from '@/hook/useGsap';
const Video = () => {
    let ref = useRef<HTMLCanvasElement>(null);
    let refContainer = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<Array<HTMLImageElement>>([]);
    
    useGsap(() => {
        let canvas = ref.current;
        if (!canvas) return;
        let context = canvas.getContext('2d');

        canvas.width = 1488;
        canvas.height = 1100;

        const frameCount = 164;
        const currentFrame = (index: number) => `/framer-image/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        const hands = { frame: 0 };

        gsap.to(hands, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                scrub: 0.5,
                trigger: canvas,
            },
            onUpdate: render
        })
        
        images[0].onload = render;
        setImages(() => images);

        function render() {
            if(!context) return;
            if(!ref.current) return;
            context?.clearRect(0, 0, ref.current.width, ref.current.height);
            context?.drawImage(images[hands.frame], 0, 0);
        }
    }, ref);
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
    
    return (
        <>
            <div  ref={refContainer} className={twMerge('block relative w-full h-fit rounded-3xl video_gsap overflow-hidden', rounded({ size: 'xl' }))}>
                <canvas ref={ref} className={twMerge(
                    'h-full w-full', 
                    'h-[70vh] xxs:h-screen sm:h-[96vh] lg:h-screen',
                    'max-h-[720px] xxs:max-h-[900px] sm:max-h-[800px] lg:max-h-[900px]', 
                    rounded({ size: 'xl' })
                )} style={{ width: "100%", objectFit: 'cover'  }} />
            </div>
        </>
    )
}

export default Video;
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap';
import { twMerge } from 'tailwind-merge';

import { rounded } from '@/components/style';

import { useMedia } from 'react-use'
const Video = () => {
    let ref = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<Array<HTMLImageElement>>([]);
    const isLg = useMedia('(min-width: 1024px)', true);
    const isSM = useMedia('(min-width: 640px)', false);
    const isXxs = useMedia('(min-width: 390px)', false);
    const [height, setHeight] = useState<string>('50vh');
    
    useEffect(() => {
        if(isLg) {
            setHeight('100vh');
        } else if(isSM) {
            setHeight('87vh');
        } else if(isXxs) {
            setHeight('100vh');
        } else {
            setHeight('70vh');
        }
    }, [isLg, isSM])
    useEffect(() => {
        let ctx = gsap.context((self) => {
            let canvas = ref.current;
            if (!canvas) return;
            let context = canvas.getContext('2d');
    
            canvas.width = 1488;
            canvas.height = 1100;
    
            const frameCount = 164;
            const currentFrame = (index: number) => `/framer-image/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
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
        }, []);
        return () => ctx.revert();
    }, [ref.current]);
    
    return (
        <>
            <div className={twMerge('block relative overflow-hidden w-full h-auto rounded-3xl', rounded({ size: 'xl' }))}>
                <canvas ref={ref} style={{ width: "100%", height: height, maxHeight: '950px', objectFit: 'cover', borderRadius: '1.5rem'  }} />
            </div>
        </>
    )
}

export default Video;
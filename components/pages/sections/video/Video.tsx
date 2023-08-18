import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap';

import { useMedia }  from '@/hook';

const Video = () => {
    let ref = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<Array<HTMLImageElement>>([]);
    const height = useMedia(['(min-width: 1024px)', '(min-width: 640px)'], ['100vh', '80vh'], '70vh')
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
                    scrub: 0.5
                },
                onUpdate: render
            })
            images[0].onload = render;
            setImages(() => images);

            function render() {

                if (!context) return;
                if (!ref.current) return;
                context?.clearRect(0, 0, ref.current.width, ref.current.height);
                context?.drawImage(images[hands.frame], 0, 0);
            }
        }, []);
        return () => ctx.revert();
    }, [images])

    return (
        <>
            <div className='block relative overflow-hidden w-full h-auto rounded-3xl'>
                <canvas ref={ref} style={{ width: "100%", height: height, objectFit: 'cover', borderRadius: '1.5rem'  }} />
            </div>
        </>
    )
}

export default Video;
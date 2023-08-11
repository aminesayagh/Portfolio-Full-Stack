import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap';


const Video = () => {
    let ref = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [images, setImages] = useState<Array<HTMLImageElement>>([]);
    useLayoutEffect(() => {
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
                context?.drawImage(images[hands.frame], 0, -500);
            }
        }, []);
        return () => ctx.revert();
    }, [])

    return (
        <>
            <div className='block relative overflow-hidden w-full rounded-3xl'>
                <canvas ref={ref} style={{  }} />
            </div>
        </>
    )
}

export default Video;
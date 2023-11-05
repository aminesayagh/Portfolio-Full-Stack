import { useRef, useContext, useEffect } from 'react'
import { gsap } from '@/utils/gsap';

import { twMerge } from 'tailwind-merge';

import { rounded } from '@/components/style';
import { CursorContent } from '@/components/ui/cursor';
import { LoadingContext } from '@/components/ui/preloader';
import { useLocomotiveScroll } from '@/lib/LocomotiveScroll';

const FRAME_COUNT = 164;

const Video = () => {
    let ref = useRef<HTMLCanvasElement>(null);
    let refContainer = useRef<HTMLDivElement>(null);
    const imagesRef = useRef([] as Array<HTMLImageElement>);
    const { addLoadingComponent, removeLoadingComponent } = useContext(LoadingContext);

    useEffect(() => {
        let isInLoad = false;
        if(isInLoad) return;

        const currentFrame = (index: number) => `/framer-image/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;
        
        Promise.all<HTMLImageElement>(Array(FRAME_COUNT).fill(0).map((_, index) => {
            const img = new Image();
            img.src = currentFrame(index + 1);
            img.width = 1488;
            img.height = 1100;
            img.alt = 'video' + '_' + index.toString().padStart(3, '0');
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';

            return new Promise((resolve, reject) => {
                img.onload = () => {
                    resolve(img);
                }
            })
        })).then((images) => {
            if (isInLoad) return;
            
            imagesRef.current = images;
        })
        return () => {
            isInLoad = true;
            if (imagesRef.current) {
                imagesRef.current.forEach((image) => {
                    image.src = '';
                })
            }
        }
    }, [removeLoadingComponent, addLoadingComponent]);
    const { isReady } = useLocomotiveScroll();

    useEffect(() => {
        if(isReady) {
            const ctx = gsap.context(() => {
                if(!imagesRef.current.length) return;
                const hands = { frame: 0 };
    
                let canvas = ref.current;
                if (!canvas) return;
                let context = canvas.getContext('2d');
    
                canvas.width = 1488;
                canvas.height = 1100;
    
                gsap.to(hands, {
                    frame: FRAME_COUNT - 1,
                    snap: 'frame',
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.5,
                        trigger: canvas,
                    },
                    onUpdate: render
                });
    
                imagesRef.current[0].onload = render;
    
                function render() {
                    if(!imagesRef.current.length) return;
                    if (!context) return;
                    if (!ref.current) return;
                    context?.clearRect(0, 0, ref.current.width, ref.current.height);
                    context?.drawImage(imagesRef.current[hands.frame], 0, 0);
                }
            }, refContainer);
            return () => {
                ctx.revert();
            }
        }
    }, [imagesRef.current.length, refContainer, isReady]);
    
    return (
        <>
            <div data-scroll ref={refContainer} className={twMerge('block relative w-full h-fit rounded-3xl video_gsap overflow-hidden will-change-transform-animation', rounded({ size: 'xl' }))}>
                <CursorContent name='CursorScrollVideo' component='CursorScroll' props={{ title: 'scroll' }}>
                    <canvas data-scroll ref={ref} className={twMerge(
                        'h-full w-full will-change-transform-animation',
                        'h-[70vh] xxs:h-screen sm:h-[96vh] lg:h-screen',
                        'max-h-[720px] xxs:max-h-[900px] sm:max-h-[800px] lg:max-h-[830px] xl:max-h-[900px]',
                        rounded({ size: 'xl' })
                    )} style={{ width: "100%", objectFit: 'cover' }} />
                </CursorContent>
            </div>
        </>
    )
}

export default Video;
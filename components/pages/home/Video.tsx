import React, { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { rounded } from "@/components/style";
import { CursorContent } from "@/components/ui/cursor";
import { usePreloader } from "@/components/ui/preloader";
import { gsap } from "@/utils/gsap";

const ORIGINAL_WIDTH = 1488; // Original image width
const ORIGINAL_HEIGHT = 835; // Original image height

const FRAME_COUNT = 164;
const LOADING_KEY = "Video";

const Video = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const imagesRef = useRef([] as Array<HTMLImageElement>);

  const { addLoadingComponent, removeLoadingComponent } = usePreloader();

  const getScreenSize = (): number => {
    const width = window.innerWidth;
    if (width < 480) return 320;
    if (width < 768) return 480;
    if (width < 1024) return 768;
    if (width < 1280) return 1024;
    if (width < 1600) return 1280;
    return 1600; // for larger screens
  };

  useEffect(() => {
    addLoadingComponent(LOADING_KEY);

    const screenSize = getScreenSize();
    const currentFrame = (index: number) =>
      `/framer-image/dim/ezgif-frame-${index
        .toString()
        .padStart(3, "0")}_${screenSize}.webp`;

    Promise.all<HTMLImageElement>(
      Array(FRAME_COUNT)
        .fill(0)
        .map((_, index) => {
          const img = new Image();
          img.src = currentFrame(index + 1);

          img.width = screenSize;
          img.height = (screenSize * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;
          img.alt = "video" + "_" + index.toString().padStart(3, "0");
          img.style.objectFit = "cover";
          img.style.objectPosition = "center";

          return new Promise(resolve => {
            img.onload = () => resolve(img);
          });
        })
    ).then(images => {
      imagesRef.current = images;
      removeLoadingComponent(LOADING_KEY);
    });
    return () => {
      if (imagesRef.current) {
        imagesRef.current.forEach(image => {
          image.src = "";
        });
      }
    };
  }, [removeLoadingComponent, addLoadingComponent]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!imagesRef.current.length) return;
      const hands = { frame: 0 };

      const canvas = ref.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");

      const screenSize = getScreenSize();

      canvas.width = screenSize;
      canvas.height = (screenSize * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;

      gsap.to(hands, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          scrub: 0.5,
          trigger: canvas
        },
        onUpdate: render
      });

      const current = imagesRef.current;
      if (!current) return;
      current[0] && (current[0]["onload"] = render);

      function render() {
        if (!imagesRef.current.length) return;
        if (!context) return;
        if (!ref.current) return;
        context?.clearRect(0, 0, ref.current.width, ref.current.height);
        const frame = hands.frame;
        const image = imagesRef.current[frame];
        if (!image) return;
        context?.drawImage(image, 0, 0);
      }
    }, refContainer);
    return () => {
      ctx.revert();
    };
  }, [imagesRef.current.length, refContainer]);

  return (
    <>
      <div
        data-scroll
        ref={refContainer}
        className={twMerge(
          "block relative w-full rounded-3xl video_gsap overflow-hidden",
          rounded({ size: "xl" })
        )}
        style={{
          height: "100%"
        }}
      >
        <CursorContent
          name="CursorScrollVideo"
          component="CursorScroll"
          props={{ title: "scroll" }}
        >
          <canvas
            data-scroll
            ref={ref}
            className={twMerge(
              "h-full w-full will-change-transform-animation",
              rounded({ size: "xl" })
            )}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </CursorContent>
      </div>
    </>
  );
};

export default Video;

"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useVelocity,
  useSpring,
  wrap,
  useAnimationFrame
} from "motion/react";;

import Image from "@/components/ui/image";
import { cn } from "@/lib/utils";
import useWindowSize from "@/hook/useWindowSize";

const BASE_VELOCITY = 4;

const Row = memo(function Row({
  images,
  baseVelocity = 100
}: {
  images: string[];
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const currentVelocity = useRef(baseVelocity);
  const targetVelocity = useRef(baseVelocity);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScroll = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 50
  });

  const velocityFactor = useTransform(smoothScroll, [0, 1000], [0, 5], {
    clamp: false
  });

  // Calculate the width of one complete set of images
  const oneSetWidth = useMemo(() => 100 * images.length, [images.length]);
  const x = useTransform(baseX, v => `${wrap(-oneSetWidth, 0, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    targetVelocity.current = isHovered ? 0 : baseVelocity;

    const ease = 0.25; // Adjust this value to control the smoothing speed (0-1)
    currentVelocity.current += (targetVelocity.current - currentVelocity.current) * ease;

    let moveBy = directionFactor.current * currentVelocity.current * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // Update position with wrapping logic
    let newX = baseX.get() + moveBy;

    
    // Implement seamless looping
    if (newX <= -oneSetWidth) {
      newX = 0;
    } else if (newX >= 0) {
      newX = -oneSetWidth;
    }

    baseX.set(newX);
  });

  const imagesElements = useMemo(() => {
    const imagesElements = Array(images.length * 4)
      .fill(0)
      .map((_, index) => (
        <motion.div
          key={`${index}-image`}
          className="relative h-full overflow-hidden rounded-xl object-cover min-w-[66vh]"
          style={{
            aspectRatio: "2/1"
          }}
        >
          <div className="absolute inset-0 z-10 bg-black/15"></div>
          <Image
            src={images[index % images.length] || ""}
            alt={`Image ${index}`}
            fill
            className="object-cover object-top rounded-xl size-full"
            placeholder="empty"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      ));

    return [...imagesElements];
  }, [images]);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative h-full flex flex-row w-full min-w-screen gap-[2vw] will-change-transform",
        "group [--gap:2rem] "
      )}
      style={{ x }}
    >
      {imagesElements}
    </motion.div>
  );
});

// Utility function to calculate container width based on screen size// Memoized utility for width calculation
const getContainerWidth = (screenWidth: number): number => {
  let padding = 0;
  if (screenWidth >= 1600) {
    padding = 80;
    return 1600 - padding;
  } else if (screenWidth >= 1500) {
    padding = 64;
    return 1500 - padding;
  } else if (screenWidth >= 1400) {
    padding = 64;
    return 1400 - padding;
  } else if (screenWidth >= 640) {
    padding = 64;
    return screenWidth - padding;
  } else {
    padding = 32;
    return screenWidth - padding;
  }
};

// Memoized image sets
const IMAGE_SETS = {
  SET_1: [
    "/images/screens/1.webp",
    "/images/screens/2.webp",
    "/images/screens/3.webp",
    "/images/screens/4.webp"
  ],
  SET_2: [
    "/images/screens/5.webp",
    "/images/screens/6.webp",
    "/images/screens/7.webp",
    "/images/screens/8.webp"
  ],
  SET_3: [
    "/images/screens/9.webp",
    "/images/screens/1.webp",
    "/images/screens/2.webp",
    "/images/screens/3.webp"
  ],
  SET_4: [
    "/images/screens/4.webp",
    "/images/screens/5.webp",
    "/images/screens/6.webp",
    "/images/screens/7.webp"
  ]
} as Record<string, string[]>;

function Overview() {
  // Create a reference for the container section
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollYPosition = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const [initialWidth, setInitialWidth] = useState(0);

  const handleResize = useCallback(() => {
    const maxWidth = getContainerWidth(window.innerWidth);
    setInitialWidth(prev => {
      // Only update if the width has actually changed
      if (Math.abs(prev - maxWidth) > 1) {
        return maxWidth;
      }
      return prev;
    });
  }, []);

  // Handle window resize
  useEffect(() => {
    // Set initial width
    handleResize();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Transform width from container width to full window width
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  useMotionValueEvent(scrollY, "change", latest => {
    if (!containerRef.current) {
      return;
    }

    const s =
      latest -
      Number(containerRef.current?.getBoundingClientRect().top) -
      window.innerHeight / 2;

    scrollYPosition.set(Math.max(s, 0));
    scrollYProgress.set(latest);
  });

  // Transform height from initial to final height
  const height = useTransform(scrollYPosition, [0, 2000], [2400, 900]);

  const { width: windowWidth } = useWindowSize();

  // Transform width from initial container width to full viewport width
  const width = useTransform(
    scrollYPosition,
    [0, 800, 2000],
    [initialWidth, windowWidth ,windowWidth] // Add 40px to account for the rounded corners
  );

  return (
    <motion.section
      ref={containerRef}
      style={{
        height,
        width
      }}
      className="w-full relative  will-change-transform overflow-hidden mx-auto rounded-2xl bg-primary-500"
    >
      <div
        style={{
          transformOrigin: "top center",
          height: 2500
        }}
        className="w-screen container absolute flex flex-col gap-[2vw] py-[2vw] inset-0 mx-auto"
      >
        <Row images={IMAGE_SETS["SET_1"] || []} baseVelocity={BASE_VELOCITY} />
        <Row images={IMAGE_SETS["SET_2"] || []} baseVelocity={-BASE_VELOCITY} />
        <Row images={IMAGE_SETS["SET_3"] || []} baseVelocity={BASE_VELOCITY} />
        <Row images={IMAGE_SETS["SET_4"] || []} baseVelocity={-BASE_VELOCITY} />
      </div>
    </motion.section>
  );
}

export default Overview;

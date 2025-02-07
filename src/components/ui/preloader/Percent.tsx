import { useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'motion/react';

const INITIAL_PERCENT = 0;
const END_LOADING_IN = 100;
const LOADING_TIMEOUT = 3000;

const Percent = ({ setEndLoadingProgress }: { 
  setEndLoadingProgress: (b: boolean) => void 
}) => {
  const [percent, setPercent] = useState(INITIAL_PERCENT);
  const progress = useMotionValue(INITIAL_PERCENT);

  useEffect(() => {
    const animation = animate(progress, END_LOADING_IN, {
      duration: LOADING_TIMEOUT / 1000,
      ease: "linear",
      onUpdate: (latest: number) => {
        setPercent(Math.floor(latest));
      },
      onComplete: () => {
        setEndLoadingProgress(true);
      }
    });

    return () => animation.stop();
  }, [progress, setEndLoadingProgress]);

  return (
    <div className="flex flex-row gap-0 py-2 overflow-hidden">
      <motion.span
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.04 }}
        className="relative flex items-center gap-1 will-change-transform-animation"
      >
        <p className="flex flex-col w-auto leading-3 align-middle text-end">
          {percent}
        </p>
      </motion.span>
    </div>
  );
};

export default Percent;
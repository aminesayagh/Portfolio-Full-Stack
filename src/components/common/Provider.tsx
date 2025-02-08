
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion="user">
                {children}
            </MotionConfig>
        </LazyMotion>
    );
};

export default Provider;
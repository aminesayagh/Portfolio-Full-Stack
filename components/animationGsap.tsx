
import React, { useLayoutEffect, useRef } from 'react';

const AnimationGsap = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null); 
    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            const tlOnHoverTextTopToButtonWithHover = gsap.timeline({ paused: true, duration: 0.2 }).to('onHoverTextTopToButtonWithHover', {});
            self.add('onHoverTextTopToButtonWithHover', (e: any) => {
                tlOnHoverTextTopToButtonWithHover
            })
        }, []);
        
        return () => {
            ctx.revert();
        }
    }, []);
    return (
        <div ref={ref}>
            {children}
        </div>
    )
}

export default AnimationGsap;
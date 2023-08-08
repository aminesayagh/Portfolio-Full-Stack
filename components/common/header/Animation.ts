import gsap from 'gsap';

const DURATION = .5;
const TRANSLATE_Y = -110;

export const staggerModal = (node: any[], delay: number) => {
    gsap.fromTo(node, {
        delay,
        opacity: 1,
        yPercent: TRANSLATE_Y,
        transformOrigin: 'right top',
        skewY: 2,
        ease: 'power3.inOut',
        stagger: {
            amount: 0.2
        }
    }, {
        duration: DURATION,
        yPercent: 0,
        skewY: 0,
    })
}
export const staggerModalClose = (node: any[], delay: number,option: any) => {
    gsap.fromTo(node, {
        yPercent: 0,
        transformOrigin: 'right top',
        skewY: 0,
        ease: 'power3.inOut',
        opacity: 1,
    }, {
        duration: DURATION / 2,
        delay,
        yPercent: TRANSLATE_Y,
        skewY: 2,
        ...option
    })
}

export const staggerText = (node: any[], delay: number) => {
    gsap.from(node, {
        duration: DURATION,
        yPercent: 100,
        delay: delay,
        opacity: 0,
        ease: 'power3.inOut',
        stagger: {
            amount: .3
        }
    })
}

export const staggerTextClose = (node: any[], delay: number) => {
    gsap.to(node, {
        duration: DURATION / 2,
        yPercent: 100,
        delay: delay,
        opacity: 0,
        ease: 'power3.inOut',
        stagger: {
            amount: .3
        }
    })
}


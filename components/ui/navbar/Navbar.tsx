import { useState, useRef, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

import { Link as LinkUi } from '@/components/ui';

import { motion, useScroll, useTransform, useAnimation, MotionValue } from 'framer-motion';
import { NavbarProps, NavbarType, BrandProps, ContentProps, ItemProps, LinkProps } from './Navbar.type';
import { twMerge } from 'tailwind-merge';
import { containerStyle } from '@/components/ui';
import { VariantProps } from 'class-variance-authority';
import { useHover } from 'react-aria';
import { zIndex } from '../conf';
const useAnimationScroll = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll({
        target: containerRef,
    });

    const scrollYRange = [0, 100, 100];
    const controls = useAnimation();
    const delta = useRef(0);
    const lastScrollY = useRef(0);

    useEffect(() => {
        scrollY.onChange(val => {
            const diff = Math.abs(val - lastScrollY.current);
            if (val >= lastScrollY.current) {
                delta.current = delta.current >= 10 ? 10 : delta.current + diff;
            } else {
                delta.current = delta.current <= -10 ? -10 : delta.current - diff;
            }
            if (delta.current >= 10 && val > 600) {
                controls.start("hidden");
            } else if (delta.current <= -10 || val < 600) {
                controls.start("visible");
            }
            lastScrollY.current = val;
        })
        return () => {
            scrollY.destroy();
        }
    }, [scrollY]);

    const containerPadding = useTransform(scrollY, scrollYRange, ['1rem', '0.5rem', '0.5rem']);
    const blur = useTransform(scrollY, scrollYRange, ['blur(0px)', 'blur(100px)', 'blur(100px)']);
    const backgroundColorWhite = useTransform(scrollY, scrollYRange, ['transparent', "#ffffff90", "#ffffff90"]);
    const backgroundColorDark = useTransform(scrollY, scrollYRange, ['transparent', "#111517", "#111517"]);
    const display = useTransform(scrollY, scrollYRange, ['flex', 'hidden', 'hidden']);
    const scale = useTransform(scrollY, scrollYRange, ['100%', '90%', '90%']);

    return [containerRef, controls, { containerPadding, blur, backgroundColorWhite, backgroundColorDark, display, scale }] as const;
}


// type of return value of useAnimationScroll
type Styles = ReturnType<typeof useAnimationScroll>[2];

const NavbarAnimation = createContext<Styles | null>(null);

const Navbar: NavbarType = ({ children, size, className, ...props }: NavbarProps) => {
    const [ref, controls, styles] = useAnimationScroll();

    const backgroundColor = styles.backgroundColorDark;
    return <>
        <NavbarAnimation.Provider value={styles}>
            <motion.header ref={ref} initial='visible' animate={controls} variants={{
                visible: {
                    y: 0,
                    transition: {
                        duration: 0.16,
                        ease: "easeIn",
                    }
                },
                hidden: {
                    y: '-120%',
                    transition: {
                        duration: 0.16,
                        ease: "easeOut",
                    }
                }
            }} style={{ 
                backgroundColor, 
                // backdropFilter: styles.blur,
                display: styles.display
            }} className={twMerge(
                'fixed top-0 left-0 w-full max-w-[100vw] py-4 z-header', className, zIndex.navbar,
            )}
            >
                <div className={twMerge('flex flex-row items-center justify-between w-full', containerStyle({ size }))}>
                    {children}
                </div>
            </motion.header>
        </NavbarAnimation.Provider>
    </>
};

const Brand = ({ children, className, ...props}: BrandProps) => {
    const styled = useContext(NavbarAnimation);
    if(!styled) return null;

    return <>
        <div className={twMerge(className)}>
            {children}
        </div>
    </>
}

const ContentActiveItem = createContext<{ activeItem: string; handleItemClick: (item: string) => void } | null>(null)

const Content = ({ children, className, ...props }: ContentProps) => {
    const styled = useContext(NavbarAnimation);
    const router = useRouter();
    const [activeItem, setActiveItem] = useState<string>('');

    useEffect(() => {
        const activeItem = router.pathname.split('/')[1];
        setActiveItem(activeItem);
    }, [router.pathname])

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    }

    if(!styled) return null;

    return <>
        <ContentActiveItem.Provider value={{ activeItem, handleItemClick }}>
            <div className={twMerge('flex flex-row items-center', className)} {...props}>
                {children}
            </div>
        </ContentActiveItem.Provider>
    </>
}

const useActiveItem = (href: string) => {
    const activeItem = useContext(ContentActiveItem);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (activeItem) {
            console.log(activeItem.activeItem, href);
            setIsActive(activeItem.activeItem === href);
        }
    }, [activeItem, href])
    return { isActive, handlerActiveItem: activeItem?.handleItemClick } as const;
}

const Item = ({ children, href }: ItemProps) => {
    const styled = useContext(NavbarAnimation);
    const { isActive, handlerActiveItem } = useActiveItem(href.toString());

    if (!styled || !handlerActiveItem) return <></>;

    return <>{children({ isActive, handlerActiveItem })}</>
}

const Link = ({ children, href, className, ...props }: LinkProps) => {
    const styled=  useContext(NavbarAnimation);
    const { isActive, handlerActiveItem } = useActiveItem(href.toString());
    const [ data, setData] = useState<object>();

    const { hoverProps, isHovered } = useHover({
        onHoverStart: (e) => {
            setData({ 'data-entering': true, 'data-exiting': false });
        },
        onHoverEnd: (e) => {
            setData({ 'data-entering': false, 'data-exiting': true });
        }
    });

    if(!styled || !handlerActiveItem) return null;

    return <LinkUi href={href} {...hoverProps} {...data} className={twMerge(className, 'whitespace-nowrap')} {...props} >
        {typeof children === 'function' ? children(isActive, handlerActiveItem) : children}
    </LinkUi>
}

Navbar.Brand = Brand;
Navbar.Content = Content;
Navbar.Item = Item;
Navbar.Link = Link;

export default Navbar;



import { useState, useEffect, useContext, createContext, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useIsomorphicLayoutEffect } from 'react-use';

import LinkUi from '@/components/ui/typography/Link';
import { containerStyle } from '@/components/ui/container';

import { NavbarProps, NavbarType, BrandProps, ContentProps, ItemProps, LinkProps } from './Navbar.type';
import { twMerge } from 'tailwind-merge';
import { useHover } from 'react-aria';
import { zIndex } from '../conf';
import { gsap } from '@/utils/gsap';
import { useLenis } from '@/lib/Lenis';


const Navbar: NavbarType = ({ children, size, className, inTopOfScroll, ...props }: NavbarProps) => {

    const delta = useRef<number>(0);
    const lastScrollY = useRef<number>(0);
    const [active, setActive] = useState<boolean>(false);
    const [positionScroll, setPositionScroll] = useState<number>(0);

    useLenis(({ scroll }) => {
        const progress = scroll.targetScroll;
        setPositionScroll(progress);
    });

    useIsomorphicLayoutEffect(() => {
        if (positionScroll < 140) {
            setActive(false);
        } else {
            setActive(true);
        }

        const diff = Math.abs(positionScroll - lastScrollY.current);
        if (positionScroll >= lastScrollY.current) {
            delta.current = delta.current >= 10 ? 10 : delta.current + diff;
        } else {
            delta.current = delta.current <= -10 ? -10 : delta.current - diff;
        }
        if (delta.current >= 10 && positionScroll > 200) {
            gsap.to(".header-gsap", { duration: 0.3, y: -100, opacity: 0, ease: "power2.inOut" });
        } else if (delta.current <= -10 || positionScroll < 200) {
            gsap.to(".header-gsap", { duration: 0.3, y: 0, opacity: 1, ease: "power2.inOut" });
        }
        lastScrollY.current = positionScroll;
    }, [positionScroll])

    const padding = useMemo(() => active && !inTopOfScroll ? '0.8rem' : '1rem', [active, inTopOfScroll]);
    const backdropFilter = useMemo(() => active && !inTopOfScroll ? 'blur(40px)' : 'blur(0px)', [active, inTopOfScroll]);
    const backgroundColor = useMemo(() => active && !inTopOfScroll ? '#1f1f1f90' : 'transparent', [active, inTopOfScroll]);
    return (<header className={twMerge(
        'fixed top-0 left-0 w-full max-w-[100vw] py-4 z-header', className, zIndex.navbar, 'header-gsap will-change-transform-animation'
    )}
        style={{
            paddingTop: padding,
            paddingBottom: padding,
            backdropFilter: backdropFilter,
            backgroundColor: backgroundColor,
        }}
        {...props}
    >
        <div className={twMerge('flex flex-row items-center justify-between w-full', containerStyle({ size }))}>
            {children}
        </div>
    </header>)
};

const Brand = ({ children, className }: BrandProps) => {
    return <>
        <div className={twMerge(className)} >
            {children}
        </div>
    </>
}

const ContentActiveItem = createContext<{ activeItem: string; handleItemClick: (item: string) => void } | null>(null)

const Content = ({ children, className, ...props }: ContentProps) => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState<string>('');


    useEffect(() => {
        const activeItem = router.pathname.split('/')[1];
        setActiveItem(activeItem);
    }, [router.pathname])
    const handleItemClick = (item: string) => {
        setActiveItem(item);
    }
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
            setIsActive(activeItem.activeItem === href);
        }
    }, [activeItem, href])
    return { isActive, handlerActiveItem: activeItem?.handleItemClick } as const;
}

const Item = ({ children, href }: ItemProps) => {
    const { isActive, handlerActiveItem } = useActiveItem(href.toString());

    if (!handlerActiveItem) return <></>;

    return <>{children({ isActive, handlerActiveItem })}</>
}

const Link = ({ children, href, className, ...props }: LinkProps) => {
    const { isActive, handlerActiveItem } = useActiveItem(href.toString());
    const [data, setData] = useState<object>();

    const { hoverProps } = useHover({
        onHoverStart: () => {
            setData({ 'data-entering': true, 'data-exiting': false });
        },
        onHoverEnd: () => {
            setData({ 'data-entering': false, 'data-exiting': true });
        }
    });

    if (!handlerActiveItem) return null;

    return <LinkUi href={href} {...hoverProps} {...data} className={twMerge(className, 'whitespace-nowrap')} {...props} >
        {typeof children === 'function' ? children(isActive, handlerActiveItem) : children}
    </LinkUi>
}

Navbar.Brand = Brand;
Navbar.Content = Content;
Navbar.Item = Item;
Navbar.Link = Link;

export default Navbar;
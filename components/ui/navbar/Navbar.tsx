import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Link as LinkUi } from '@/components/ui';


import { NavbarProps, NavbarType, BrandProps, ContentProps, ItemProps, LinkProps } from './Navbar.type';
import { twMerge } from 'tailwind-merge';
import { containerStyle } from '@/components/ui';
import { useHover } from 'react-aria';
import { zIndex } from '../conf';


const Navbar: NavbarType = ({ children, size, className, inTopOfScroll, ...props }: NavbarProps) => {

    return <header className={twMerge(
            'header-fixed fixed top-0 left-0 w-full max-w-[100vw] py-4 z-header', className, zIndex.navbar, 'header-gsap will-change-transform-animation'
        )}
            {...props}
        >
            <div className={twMerge('flex flex-row items-center justify-between w-full', containerStyle({ size }))}>
                {children}
            </div>
        </header>
};

const Brand = ({ children, className, ...props }: BrandProps) => {
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

    const { hoverProps, isHovered } = useHover({
        onHoverStart: (e) => {
            setData({ 'data-entering': true, 'data-exiting': false });
        },
        onHoverEnd: (e) => {
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
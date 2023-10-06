import _ from 'lodash';

const menuType = {
    secondary: 'secondary',
    hamburger: 'hamburger',
    socialNetworks: 'socialNetworks'
} as const;

export const menuValues = Object.values(menuType);
type MenuType = typeof menuType[keyof typeof menuType];

interface MenuItem {
    id: string;
    link: string;
    menu: MenuType[];
}

type MenuItemNames = 'intro' | 'manifesto' | 'experience' | 'cases' | 'contact' | 'instagram' | 'linkedin' | 'github' | 'dribbble' | 'behance';

type MenuItems = {
    [key in MenuItemNames]: MenuItem;
}
const MENU_ITEMS: MenuItems = {
    intro: {
        id: 'intro',
        link: '/#intro',
        menu: []
    },
    manifesto: {
        id: 'manifesto',
        link: '/',
        menu: ['secondary', 'hamburger']
    },
    experience: {
        id: 'experience',
        link: '/',
        menu: ['secondary', 'hamburger']
    },
    cases: {
        id: 'cases',
        link: '/',
        menu: ['secondary', 'hamburger']
    },
    contact: {
        id: 'contact',
        link: '/contact',
        menu: ['secondary', 'hamburger']
    },
    instagram: {
        link: 'https://www.instagram.com/',
        menu: ['socialNetworks'],
        id: 'instagram'
    },
    linkedin: {
        link: 'https://www.linkedin.com/',
        menu: ['socialNetworks'],
        id: 'linkedin'
    },
    github: {
        link: 'https://www.github.com/',
        menu: ['socialNetworks'],
        id: 'github'
    },
    dribbble: {
        link: 'https://www.dribbble.com/',
        menu: ['socialNetworks'],
        id: 'dribbble'
    },
    behance: {
        link: 'https://www.behance.com/',
        menu: ['socialNetworks'],
        id: 'behance'
    }
};

export const getMenuItems = (menuType: MenuType): MenuItem[] => {
    return _.values(MENU_ITEMS).filter((menuItem: MenuItem) => menuItem.menu.includes(menuType));
}

export { MENU_ITEMS };

export type { MenuType, MenuItem, MenuItemNames, MenuItems };


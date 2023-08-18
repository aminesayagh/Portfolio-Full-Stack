import dynamic from 'next/dynamic';

// export { default as Header } from './header';
export const Header = dynamic(() => import('./header'), { ssr: false });
export const Footer = dynamic(() => import('./footer'), { ssr: false });
export { default as Head } from './head';
export { default as HamburgerMenu} from './hamburgerMenu';
export { default as SwitchLang } from './switchLang';
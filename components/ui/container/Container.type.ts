export interface ContainerProps {
    children: React.ReactNode | React.ReactNode[];
    id?: string;
    size: 'lg' | 'full',
    className?: string;
    as?: 'span' | 'div' | 'section' | 'footer' | 'header';
}
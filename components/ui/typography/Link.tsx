import { FC, useMemo } from 'react';
import { LinkPropsExtended } from './Typography.type';
import { twMerge } from 'tailwind-merge';
import LinkNext from 'next/link';
import { textClassNames } from './Typography.style';
import { CursorContent } from '@/components/ui/cursor';

const Link: FC<LinkPropsExtended> = ({ weight, degree = '3', size, exchange, className, animation, children, href, ...props }) => {
    const classNameExtended = useMemo(() => {return (size && weight) ? textClassNames({ weight, size, degree, exchange }) : className}, [weight, size, degree, exchange, className]);
    return <CursorContent name={`cursorPointer_header_email`} component='CursorEvent' props={{
        event: 'pointer',
    }} className={className} ><LinkNext href={href} className={twMerge(
        classNameExtended, 'remove_outline', className
    )} {...props}>{children}</LinkNext></CursorContent>
}

export default Link;
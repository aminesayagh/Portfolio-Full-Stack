import LinkNext from 'next/link';
import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { CursorContent } from '@/components/ui/cursor';

import { textClassNames } from './Typography.style';
import { LinkPropsExtended } from './Typography.type';

const Link: FC<LinkPropsExtended> = ({ weight, degree = '3', size, exchange, className, children, href, ...props }) => {
    const classNameExtended = useMemo(() => {return (size && weight) ? textClassNames({ weight, size, degree, exchange }) : className}, [weight, size, degree, exchange, className]);
    return <CursorContent name={`cursorPointer_header_email`} component='CursorEvent' props={{
        event: 'pointer',
    }} className={className} ><LinkNext href={href} className={twMerge(
        classNameExtended, 'remove_outline', className
    )} {...props}>{children}</LinkNext></CursorContent>
}

export default Link;
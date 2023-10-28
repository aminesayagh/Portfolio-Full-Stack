import { FC } from 'react';
import { textColorDegree, displayStyle, textStyle, titleStyle } from './Typography.style'
import { LinkPropsExtended } from './Typography.type';
import { twMerge } from 'tailwind-merge';
import LinkNext from 'next/link';
import { textClassNames } from './Typography.style';
import { CursorContent } from '@/components/ui';
const Link: FC<LinkPropsExtended> = ({ weight, degree = '3', size, exchange, className, animation, children, href, ...props }) => {
    const classNameExtended = (size && weight) ? textClassNames({ weight, size, degree, exchange }) : className;
    return <CursorContent name={`cursorPointer_header_email`} component='CursorEvent' props={{
        event: 'pointer',
    }} className={className} ><LinkNext href={href} className={twMerge(
        classNameExtended, 'remove_outline', className
    )} {...props}>{children}</LinkNext></CursorContent>
}

export default Link;
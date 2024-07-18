import { forwardRef, useMemo, memo } from 'react';
import { FocusRing } from 'react-aria';
import { Button } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

import { CursorContent } from '@/components/ui/cursor';
import { textClassNames } from '@/components/ui/typography';

import { ButtonProps } from './Button.type';

const ButtonUi = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  size = 'auto',
  full,
  weight,
  name,
  degree = "0",
  exchange,
  className,
  ...props
}, ref) => {
    const buttonClasses = useMemo(() => twMerge(
        'touch-none select-none focus:outline-none',
        'gap-2 flex flex-row flex-nowrap self-center items-center justify-center',
        'font-sans font-bold',
        'text-clip whitespace-nowrap overflow-hidden',
        'align-middle',
        full ? 'w-full' : '',
        textClassNames({ weight, size, degree, exchange }),
        typeof className == 'string' ? className : ''
    ), [size, full, weight, degree, exchange, className]);

    return (
        <FocusRing>
            <CursorContent name="cursorPointer_header_email" component='CursorEvent' props={{ event: 'pointer' }}>
                <Button name={name} ref={ref} className={buttonClasses} {...props}>
                    {children}
                </Button>
            </CursorContent>
        </FocusRing>
    );
});

ButtonUi.displayName = 'ButtonUi'; // Add display name

export default memo(ButtonUi);
 
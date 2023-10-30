import { FocusRing } from 'react-aria';
import { Button } from 'react-aria-components'
import { ButtonProps } from './Button.type';
import { twMerge } from 'tailwind-merge';
import { textClassNames } from '@/components/ui/typography';
import { CursorContent } from '@/components/ui';
import { forwardRef, memo } from 'react';

const ButtonUi = forwardRef<HTMLButtonElement | null, ButtonProps>(function MyButton({ children, icon, iconRight, size = 'auto', full, weight, degree = "0", exchange, className, ...props }: ButtonProps, ref) {
    return <FocusRing >
        <CursorContent name={`cursorPointer_header_email`} component='CursorEvent' props={{
            event: 'pointer',
        }}>
            <Button ref={ref} className={twMerge(
                'touch-none select-none focus:outline-none',
                'gap-2 flex flex-row flex-nowrap self-center items-center justify-center',
                'font-sans font-bold',
                'text-clip whitespace-nowrap overflow-hidden',
                'align-middle',
                full && 'w-full',
                textClassNames({ weight, size, degree, exchange }),
                typeof className == 'string' && className,
            )} {...props} >
                {children}
            </Button>
        </CursorContent>
    </FocusRing>
})

export default memo(ButtonUi);

import { cva } from 'class-variance-authority';

export const containerStyle = cva([
    'mx-auto w-full max-w-full z-container h-fit 2xl:max-w-[1400px] 3xl:max-w-[1500px] 4xl:max-w-[1600px]'], {
    variants: {
        size: {
            lg: 'px-4 xs:px-5 sm:px-8 xl:px-10',
            full: 'px-2 [&>*]:px-2 [&>*]:xs:px-3 [&>*]:sm:px-6 [&>*]:lg:px-8'
        }
    }
}) 
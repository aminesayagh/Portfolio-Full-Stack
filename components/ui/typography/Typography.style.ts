
import { cva, VariantProps } from 'class-variance-authority';
const textDefault = 'align-middle inline-block';
const fontFamilyTitle = 'font-sans';
const fontFamilyText = 'font-sans';

export const textColorDegree = {
    "normal": {
        "0": "",
        "1": "text-white-100",
        "2": "text-white-300",
        "3": "text-white-600",
        "4": "text-gray-200",
    },
    "exchanged": {
        "0": "",
        "1": "text-black-100",
        "2": "text-black-300",
        "3": "text-black-600",
        "4": "text-gray-800",
    }
}

export const displayStyle = cva([textDefault, fontFamilyTitle], {
    variants: {
        weight: {
            bold: 'font-black',
            semibold: 'font-semibold',
            medium: 'font-medium',
        },
        size: {
            'xl': '',
            'lg': '',
            'md': '',
        }
    },
    defaultVariants: {
        weight: 'bold',
        size: 'xl',
    }
})

export const titleStyle = cva([textDefault, fontFamilyTitle], {
    variants: {
        weight: {
            bold: 'font-black',
            semibold: 'font-semibold',
            medium: 'font-medium',
        },
        as: {
            h1: 'text-4xl',
            h2: 'text-3xl',
            h3: 'text-2xl',
            h4: 'text-xl',
            h5: 'text-lg',
            h6: 'text-base',
        }
    },
    defaultVariants: {
        weight: 'bold',
        as: 'h1',
    }
})

export const textStyle = cva([textDefault, fontFamilyText], {
    variants: {
        weight: {
            bold: 'font-black',
            semibold: 'font-semibold',
            medium: 'font-medium',
        },
        size: {
            'lg': 'text-xl',
            'md': 'text-lg',
            'sm': 'text-base',
            'xs': 'text-tiny',
        },
    },
    defaultVariants: {
        weight: 'medium',
        size: 'sm',
    }
})
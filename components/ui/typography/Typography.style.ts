
import { cva, VariantProps } from 'class-variance-authority';
const textDefault = 'inline-block align-middle';
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
        }
    },
    defaultVariants: {
        weight: 'bold'
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
            'sm': 'text-sm',
            'xs': 'text-xs',
        },
    },
    defaultVariants: {
        weight: 'medium',
        size: 'sm',
    }
})

import { cva, VariantProps } from 'class-variance-authority';
const textDefault = 'inline-block align-middle';
const fontFamilyTitle = 'font-sans';
const fontFamilyText = 'font-sans';

export const textColorDegree = {
    "normal": {
        "0": "",
        "1": "text-white-100",
        "2": "text-gray-300",
        "3": "text-gray-500",
        "4": "text-gray-700",
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
            semibold: 'font-bold',
            medium: 'font-regular',
        }
    },
    defaultVariants: {
        weight: 'bold'
    }
})

export const titleStyle = cva([textDefault, fontFamilyTitle], {
    variants: {
        weight: {
            bold: 'font-extrabold',
            semibold: 'font-bold',
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
    },
    defaultVariants: {
        weight: 'medium',
    }
})
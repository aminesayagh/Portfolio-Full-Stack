
import { cva } from 'class-variance-authority';

const textDefault = 'inline-block align-middle';
const fontFamilyTitle = 'font-sans';
const fontFamilyText = 'font-sans';

export const textColorDegree = {
    "normal": {
        "0": "",
        "1": "text-white-100",
        "2": "text-white-600",
        "3": "text-white-700",
        "4": "text-white-800"
    },
    "exchanged": {
        "0": "",
        "1": "text-black-100",
        "2": "text-black-400",
        "3": "text-black-700",
        "4": "text-black-800"
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
import { TextPropsType } from './Typography.type';
import { twMerge } from 'tailwind-merge';
import Style from './Typography.module.scss';

export const textClassNames = ({ weight, size, degree, exchange }: TextPropsType) => {
    return twMerge(
        textStyle({
            weight
        }),
        Style[`text_${size}`],
        Style['text'],
        textColorDegree[!!exchange ? "exchanged" : "normal"][degree]
    )
}
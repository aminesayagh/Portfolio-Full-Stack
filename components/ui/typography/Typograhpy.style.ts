import { cva, VariantProps } from 'class-variance-authority';

const textDefault = 'align-middle inline-block';
const fontFamilyTitle = 'font-sans';
const fontFamilyText = 'font-sans';

export const titleColorStatus = {
    default: '',
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-info-500',
}
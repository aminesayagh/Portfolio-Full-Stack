import Image, { ImageProps } from 'next/image';

const images: { [key: string]: { src: string; width: number; height: number } } = {
    test: {
        src: '/images/test.png',
        width: 100,
        height: 100,
    }
} as const;

type ImageName = keyof typeof images;

interface Props extends Omit<ImageProps, 'src'> {
    src: ImageName | ImageProps['src'];
}

const ImageUi = ({ alt, src, ...props }: Props) => {
    const imageProps = (typeof src == "string" && Object.keys(images).includes(src)) ? images[src] : { src };
    if (!imageProps) return null;
    return  <Image alt={alt} {...imageProps} src={imageProps.src as string} {...props} />
}

export default ImageUi;
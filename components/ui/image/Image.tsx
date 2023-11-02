import Image, { ImageProps } from 'next/image';

const images = {
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
    // @ts-ignore
    const imageProps = (typeof src == "string" && Object.keys(images).includes(src)) ? images[src] : { src };
    return  <Image alt={alt} {...imageProps} {...props} />
}

export default ImageUi;
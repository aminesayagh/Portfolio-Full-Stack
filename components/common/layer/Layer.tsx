import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import Container from '@/components/ui/container';
import Cursor from '@/components/ui/cursor';
import { usePreloader } from '@/components/ui/preloader';

const HeaderDynamic = dynamic(() => import('@/components/common/header'), {});
const FooterDynamic = dynamic(() => import('@/components/common/footer'), {});

const Layer = ({ children }: {
    children: React.ReactElement | React.ReactElement[];
}) => {

    const { endLoading } = usePreloader();
    const { i18n } = useTranslation();
    useEffect(() => {
        if (endLoading) {
            if (!document.body.classList.contains('is-loaded')) {
                document.body.classList.add('is-loaded');
            }
            const timer = setTimeout(() => {
                if (document.body.classList.contains('is-loaded')) document.body.classList.remove('is-loaded');
            }, 2000);
            return () => {
                clearTimeout(timer);
            }
        }
        return () => null;
    }, [i18n.language, endLoading]);

    return <Cursor >
        <HeaderDynamic />
        <>{children}</>
        <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 xl:gap-12')}>
            <FooterDynamic />
        </Container>
    </Cursor>
}

export default Layer;

import HeadNext from 'next/head';
import { NextSeo } from 'next-seo';
import Script from 'next/script'

const Head = ({ title, description, keywords, author, logo }: { title: string, description: string, keywords: string, author: string, logo: string }) => {
    return <>
        <NextSeo title={title} description={description}  />
        <HeadNext>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
            <meta name='author' content={author} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

=            <link rel="icon" href={logo} />
        </HeadNext>
        <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-5L7DRGL9" />
        <Script id="google-analytics">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'GTM-5L7DRGL9');
            `}
        </Script>
    </>
}

export default Head;

import { NextSeo } from 'next-seo';

const Head = ({ title, description, keywords, author, logo }: { title: string, description: string, keywords: string, author: string, logo: string }) => {

    return <>
        <NextSeo title={title} description={description}  additionalMetaTags={[
            {
                property: 'dc:creator',
                content: 'Mohamed Amine SAYAGH',
                keyOverride: 'creator1'
            },
            {
                name: 'application-name',
                content: 'Mohamed Amine SAYAGH',
                keyOverride: 'application-name'
            },
            {
                name: 'msapplication-TileColor',
                content: '#0e0e0e',
                keyOverride: 'msapplication-TileColor'
            },
            {
                name: 'keywords',
                content: keywords,
                keyOverride: 'keywords'
            },
            {
                name: 'author',
                content: author,
                keyOverride: 'author'
            },
            {
                name: 'robots',
                content: 'index, follow',
                keyOverride: 'robots'
            },
            {
                name: 'googlebot',
                content: 'index, follow',
                keyOverride: 'googlebot'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
                keyOverride: 'viewport'
            }
        ]} additionalLinkTags={[
            {
                rel: 'icon',
                href: logo,
            },
            {
                rel: 'apple-touch-icon',
                href: logo,
                sizes: '180x180'
            },
        ]} openGraph={{
            type: 'website',
            url: 'https://www.masayagh.com',
            title: title,
            description: description,
            site_name: 'Mohamed Amine SAYAGH',
            profile: {
                firstName: 'Mohamed Amine',
                lastName: 'SAYAGH',
                username: 'masayagh',
                gender: 'man'
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvxn9nvjs/image/upload/v1668256745/team/mohamed_amine_sayagh.jpg',
                    width: 800,
                    height: 600,
                    alt: 'Mohamed Amine SAYAGH',
                }
            ]
        }}
        />
    </>
}

export default Head;

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Article = () => {
    return (<div></div>)
}

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default Article;
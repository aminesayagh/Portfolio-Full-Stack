import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Project = () => {
    return <div></div>
}

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
})

export default Project;
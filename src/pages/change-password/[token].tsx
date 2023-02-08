import { GetServerSideProps, NextPage } from "next";

const ChangePassword: NextPage<{token: string}>= ({token})=>{
    // const {query} = useRouter()
    console.log("token", token)
    return (
        <></>
    )
}

// this could also be used we get the same result
// ChangePassword.getInitialProps =({query})=>{
//     return {
//         token: query?.token as string
//     }
// }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    return {
       props: {
        token: params?.token as string,
       }
    }
}

export default ChangePassword
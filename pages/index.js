import HomePage from "../components/template/HomePage";
import { getSession } from "next-auth/react"

export default function Home() {
  return (
    <HomePage />
  )
}


export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req })

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }

  return {
    props: {
      data: null
    }
  }
}

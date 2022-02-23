import type {NextPage} from 'next'
import TodoApp from './todo/todoApp'
import Head from "next/head";

const Home: NextPage = () => {
  return (
      <>
        <Head>
          <title>TODO Next.js App</title>
          <meta name="description" content="Next.js" />
        </Head>
        <div className="home-page">
          <div className="container page">
            <div className="row">
              <TodoApp/>
            </div>
          </div>
        </div>
      </>
  )
}

export default Home

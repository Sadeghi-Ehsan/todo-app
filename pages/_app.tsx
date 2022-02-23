import Head from "next/head";
import '../styles/globals.css'
import "@fontsource/fredoka-one"; // Defaults to weight 400.
import '../styles/Todo.css'
import type { AppProps } from 'next/app'
import ContextProvider from "../lib/context";
import Layout from "../components/common/Layout";


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
    </Head>
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  </>

}

export default MyApp

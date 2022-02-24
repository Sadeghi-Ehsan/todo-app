import Head from "next/head";
import '../styles/globals.css'
import "@fontsource/fredoka-one"; // Defaults to weight 400.
import '../styles/Todo.css'
import type { AppProps } from 'next/app'
import ContextProvider from "../lib/context";
import Layout from "../components/common/Layout";
import { createServer } from "miragejs"
const environment = process.env.NODE_ENV
if (environment !== "production") {
  createServer({
    routes() {
      this.get("/api/todos", () => [
        {
          "id": "085d3506-7138-4542-af6b-f408adec5ef5",
          "title": "task one",
          "completed": false
        },
        {
          "id": "b8dcc37c-b972-4700-9115-db13bc1bef62",
          "title": "task two",
          "completed": false
        },
        {
          "id": "3f5154cf-f796-4c71-887b-86417768aae8",
          "title": "task about completed ones",
          "completed": true
        },
        {
          "id": "3f078627-5da4-4c47-aad5-effb35235681",
          "title": "task four",
          "completed": true
        }
      ])
    },
  })
}


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

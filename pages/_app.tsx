import '../styles/globals.css'
import "@fontsource/fredoka-one"; // Defaults to weight 400.
import '../styles/Todo.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

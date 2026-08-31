import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Havenest</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

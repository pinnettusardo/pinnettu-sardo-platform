import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Havenest</title>
      </Head>
      
      {/* La Navbar ora è globale e automatica su tutte le pagine */}
      <Navbar />
      
      <Component {...pageProps} />
    </>
  );
}

import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a1628" />
        <link rel="icon" href="/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="29ª Taça Luigi Patriarcha" />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

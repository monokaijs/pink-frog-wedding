import '@app/styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd-css-utilities/utility.min.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

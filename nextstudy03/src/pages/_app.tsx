import { StoreContext, store } from '@/app/stores/store';
import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
  </StoreContext.Provider>
  );
}

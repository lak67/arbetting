import '../styles/globals.css'
import Layout from '../components/Layout'
import { StrictMode } from 'react'

function MyApp({ Component, pageProps }) {
  return(
    <StrictMode>
    {/* <DataProvider>
     */}
    <Layout>
       <Component {...pageProps} />
    </Layout>
    {/* 
    </DataProvider> */}
    </StrictMode>
  )
}

export default MyApp
import React from 'react'
import { AppProps } from 'next/app';
import axios from 'axios';
import { AuthProvider } from '../context/auth'
import { SWRConfig } from 'swr'

import Navbar from '../components/Navbar';
import { useRouter } from 'next/router'

import '../styles/tailwind.css'
import '../styles/icons.css'

axios.defaults.baseURL = 'http://localhost:5000/api/'
axios.defaults.withCredentials = true

function App({ Component, pageProps }: AppProps) {

  const { pathname } = useRouter();
  const myPaths = ['/auth/login', '/auth/register']
  const authPath = myPaths.includes(pathname)

  const fetcher = async (url: string) => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (err) {
      throw err.response.data
    }
  }

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000
      }}>
      <AuthProvider>
        {!authPath && <Navbar />}
        <div className={authPath ? '' : 'pt-12'}>
          <Component {...pageProps} />
        </div>
      </AuthProvider >
    </SWRConfig>
  )
}

export default App
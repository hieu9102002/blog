import '../styles/globals.css'
import {ComponentClass, FC, PropsWithChildren} from 'react';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

const MyApp:FC<{Component:ComponentClass,pageProps:PropsWithChildren}> = ({ Component, pageProps }) => {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Toaster></Toaster>
    </UserContext.Provider>
  )
}

export default MyApp

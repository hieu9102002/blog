import '../styles/globals.css'
import {GetServerSideProps} from "next";
import {ComponentClass, FC, PropsWithChildren} from 'react';
import Navbar from '../components/Navbar';

const MyApp:FC<{Component:ComponentClass,pageProps:PropsWithChildren}> = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

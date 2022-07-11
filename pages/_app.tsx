import '../styles/globals.css'
import {GetServerSideProps} from "next";
import {ComponentClass, FC, PropsWithChildren} from 'react';

const MyApp:FC<{Component:ComponentClass,pageProps:PropsWithChildren}> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp

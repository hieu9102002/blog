import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

const Home = () => {
  return (
    <div>
      <button onClick={() => {toast.success("hello toast!")}}>
        Toast Me
      </button>  
    </div>
  )
}

export default Home;
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MainSatView from '@/components/MainSatView/MainSatView'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainSatView />
  )
}

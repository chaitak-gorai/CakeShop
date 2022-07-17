import Head from 'next/head'
import Image from 'next/image'
import { Container } from 'react-bootstrap'

import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HomeScreen from '../screens/HomeScreen'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className='py-3'>
        <Container className='main'>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

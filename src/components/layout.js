import React from 'react'
import Header from './header'
import Footer from './footer'
import { AnimatePresence, motion } from 'framer-motion'

const Layout = ({ children, location }) => {
  const journal = location && location.pathname.split('/')[1] === 'journal'
  const books = location && location.pathname.split('/')[1] === 'books'
  const journalHome = location && location.pathname === '/journal/'
  const booksHome = location && location.pathname === '/books/'

  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 0.25 } },
    start: { opacity: 0 },
  }

  return (
    <>
      <Header journal={journal} books={books} journalHome={journalHome} booksHome={booksHome}></Header>
      <AnimatePresence mode='wait'>
        <motion.main
          key={location.pathname}
          variants={container}
          initial='start'
          animate='in'
          exit='out'
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer></Footer>
    </>
  )
}

export default Layout

import React from 'react'
import Header from './header'
import Footer from './footer'
import { AnimatePresence, motion } from 'framer-motion'

const Layout = ({ children, location }) => {
  const journal = location && location.pathname.includes('journal')
  const books = location && location.pathname.includes('books')

  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 0.25 } },
    start: { opacity: 0 },
  }

  return (
    <>
      <Header journal={journal} books={books}></Header>
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

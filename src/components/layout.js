import React, { useEffect, useState } from 'react'
import Header from './header'
import Footer from './footer'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowSize from '../utils/useWindowSize'

const Layout = ({ children, location }) => {
  const { height } = useWindowSize()
  const [splashShown, setSplashShown] = useState(() => {
    // Check if window (browser environment) is available
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splash')
    }
    return false // Default initial value if nothing is found or in SSR environment
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashShown(true)
      sessionStorage.setItem('splash', true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!splashShown) {
      document.body.style.position = 'fixed'
      document.body.style.top = '0px'
    } else {
      document.body.style.position = 'static'
    }
  }, [splashShown])

  const journal = location && location.pathname.split('/')[1] === 'journal'
  const books = location && location.pathname.split('/')[1] === 'books'
  const journalHome = location && location.pathname === '/journal/'
  const booksHome = location && location.pathname === '/books/'

  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 0.25 } },
    start: { opacity: 0 },
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5, // Adds an initial delay before the first child starts
        staggerChildren: 0.5, // Staggers each child's animation by 0.1s
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <AnimatePresence mode='wait'>
        {!splashShown && (
          <motion.div
            className='splash-container'
            key='splashcontainer'
            style={{ height: height }}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { when: 'afterChildren', duration: 1.5 },
            }}
          >
            <motion.div
              className='splash-text-container'
              key='textcontainer'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <motion.p key='item1' variants={itemVariants}>
                Crafting
              </motion.p>
              &nbsp;
              <motion.p key='item2' variants={itemVariants}>
                <em>Ideas</em>
              </motion.p>
              &nbsp;
              <motion.p key='item3' variants={itemVariants}>
                that
              </motion.p>
              &nbsp;
              <motion.p key='item4' variants={itemVariants}>
                Shape
              </motion.p>
              &nbsp;
              <motion.p key='item5' variants={itemVariants}>
                <em>Culture</em>
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Header
        journal={journal}
        books={books}
        journalHome={journalHome}
        booksHome={booksHome}
      ></Header>
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

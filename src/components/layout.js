import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children, location }) => {
  const journal = location && location.pathname.includes('journal')
  const books = location && location.pathname.includes('books')
  return (
    <>
      <Header journal={journal} books={books}></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}

export default Layout

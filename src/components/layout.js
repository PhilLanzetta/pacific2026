import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children, location }) => {
  const journal = location && location.pathname.includes('journal')
  return (
    <>
      <Header journal={journal}></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}

export default Layout

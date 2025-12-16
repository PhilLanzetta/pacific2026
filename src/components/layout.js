import React, { useState } from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children, location }) => {
  const [black, setBlack] = useState(false)
  const info = location?.pathname === '/info/'
  return (
    <>
      <Header info={info} setBlack={setBlack}></Header>
      {info && <div className={black ? 'info-page-black' : 'info-page'}></div>}
      <main className={black ? 'main-black' : ''}>{children}</main>
      <Footer black={black}></Footer>
    </>
  )
}

export default Layout

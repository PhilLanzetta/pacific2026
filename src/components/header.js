import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/logo.svg'
import HideOnScroll from './hideOnScroll'

const Header = () => {
  return (
    <header>
      <div className='desktop-menu'>
        <Link to='/info'>Information</Link>
        <Link to='/work'>Work</Link>
        <Link to='/journal'>Journal</Link>
        <Link to='/publishing'>Publishing</Link>
      </div>
      <HideOnScroll>
        <Link to='/'>
          <img src={Logo} alt='Pacific'></img>
        </Link>
      </HideOnScroll>
      <div></div>
    </header>
  )
}

export default Header

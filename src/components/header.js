import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/logo.svg'
import HideOnScroll from './hideOnScroll'

const Header = ({ info, setBlack }) => {
  return (
    <header>
      <div>
        {info ? (
          <Link
            to='/'
            onMouseEnter={() => setBlack(true)}
            onMouseLeave={() => setBlack(false)}
          >
            X Close
          </Link>
        ) : (
          <Link to='/info'>Information</Link>
        )}
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

import React, { useState } from 'react'
import { Link } from 'gatsby'
import Logo from '../images/logo.svg'
import HideOnScroll from './hideOnScroll'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <header>
        <div className='desktop-menu'>
          <Link to='/info'>Information</Link>
          <Link to='/work'>Work</Link>
          <Link to='/journal'>Journal</Link>
          <Link to='/publishing'>Publishing</Link>
        </div>
        <div className='mobile-placeholder'></div>
        <HideOnScroll>
          <Link to='/'>
            <img src={Logo} alt='Pacific'></img>
          </Link>
        </HideOnScroll>
        <div></div>
      </header>
      <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
        <div
          className={`mobile-inner ${isOpen ? 'mobile-open' : 'mobile-closed'}`}
        >
          <Link to='/' className='mobile-logo-container'>
            <img
              src={Logo}
              alt='Pacific'
              className={isOpen ? 'mobile-logo' : 'mobile-logo-closed'}
            ></img>
          </Link>
          <div className='mobile-inner-container'>
            <div className='mobile-inner-links'>
              <Link to='/info'>Information</Link>
              <Link to='/work'>Work</Link>
              <Link to='/journal'>Journal</Link>
              <Link to='/publishing'>Publishing</Link>
            </div>
            <div className='mobile-inner-lower'>
              <div>
                <a
                  href='https://maps.app.goo.gl/8vXst9aKP9nn7rJu5'
                  target='_blank'
                  rel='noreferrer'
                >
                  161 Water St
                  <br />
                  New York, NY 10038
                </a>
              </div>
              <div>
                <a
                  href='https://www.instagram.com/pacific_pacific'
                  target='_blank'
                  rel='noreferrer'
                >
                  Instagram: @pacific_pacific
                </a>
                <a
                  href='https://www.linkedin.com/company/pacificpacific/'
                  target='_blank'
                  rel='noreferrer'
                >
                  LinkedIn: @pacific_pacific
                </a>
              </div>
              <div>
                <a
                  href='mailto:studio@pacificpacific.pub'
                  className='footer-link'
                >
                  studio@pacificpacific.pub
                </a>
                <a
                  href='mailto:business@pacificpacific.pub'
                  className='footer-link'
                >
                  business@pacificpacific.pub
                </a>
              </div>
            </div>
          </div>
        </div>
        <button className='mobile-menu-btn' onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
      </div>
    </>
  )
}

export default Header

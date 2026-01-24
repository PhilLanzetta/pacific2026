import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import Logo from '../images/logo.svg'
import journalLogo from '../images/journal_logo.svg'
import booksLogo from '../images/books_logo.svg'
import HideOnScroll from './hideOnScroll'
import useWindowSize from '../utils/useWindowSize'

const Header = ({ journal, books, journalHome, booksHome }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { height } = useWindowSize()
  const [menuHeight, setMenuHeight] = useState('calc(100vh - 50px)')

  useEffect(() => {
    setMenuHeight(`${height - 50}px`)
  }, [])

  let touchstartX = 0
  let touchendX = 0

  function handleGesture() {
    const swipeThreshold = 20 // Minimum distance for a swipe

    if (touchendX < touchstartX - swipeThreshold) {
      // Swipe left detected
      setIsOpen(false) // Programmatically trigger the click event
    }
  }

  return (
    <>
      <header>
        <div className='desktop-menu'>
          <Link
            to='/info'
            activeClassName='active-desktop-link'
            partiallyActive
          >
            Information
          </Link>
          <Link to='/' activeClassName='active-desktop-link'>
            Work
          </Link>
          <Link
            to='/journal'
            activeClassName='active-desktop-link'
            partiallyActive
          >
            Journal
          </Link>
          <Link
            to='/books'
            activeClassName='active-desktop-link'
            partiallyActive
          >
            Books
          </Link>
        </div>
        <div className='mobile-placeholder'></div>
        <HideOnScroll journal={journal} books={books}>
          <div className='header-logo-container'>
            {journal && (
              <Link to='/journal'>
                <img
                  src={journalLogo}
                  alt='Pacific Journal'
                  className='journal-header-logo'
                ></img>
              </Link>
            )}
            {books && (
              <Link to='/books'>
                <img
                  src={booksLogo}
                  alt='Pacific Books'
                  className='books-header-logo'
                ></img>
              </Link>
            )}
            {!journal && !books && (
              <Link to={'/'}>
                <img src={Logo} alt='Pacific' className='header-logo'></img>
              </Link>
            )}
          </div>
          {journalHome && (
            <div className='journal-sub-heading'>
              Writing on work, process, and observation
            </div>
          )}
          {booksHome && (
            <div className='books-sub-heading'>
              Design and publishing for art and culture
            </div>
          )}
        </HideOnScroll>
        <div></div>
      </header>
      <div
        onTouchStart={(e) => {
          touchstartX = e.changedTouches[0].screenX
        }}
        onTouchEnd={(e) => {
          touchendX = e.changedTouches[0].screenX
          handleGesture()
        }}
        className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}
      >
        <div
          className={`mobile-inner ${isOpen ? 'mobile-open' : 'mobile-closed'}`}
        >
          {journal ? (
            <button
              onClick={() => {
                setIsOpen(false)
                setTimeout(() => {
                  navigate('/journal')
                }, 500)
              }}
              className='mobile-logo-container'
            >
              <img
                src={journalLogo}
                alt='Pacific'
                className='mobile-journal-logo'
              ></img>
            </button>
          ) : books ? (
            <button
              onClick={() => {
                setIsOpen(false)
                setTimeout(() => {
                  navigate('/books')
                }, 500)
              }}
              className='mobile-logo-container'
            >
              <img
                src={booksLogo}
                alt='Pacific'
                className='mobile-books-logo'
              ></img>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false)
                setTimeout(() => {
                  navigate('/')
                }, 500)
              }}
              className='mobile-logo-container'
            >
              <img src={Logo} alt='Pacific' className='mobile-logo'></img>
            </button>
          )}
          <div
            style={{ height: menuHeight }}
            className={`mobile-inner-container ${
              isOpen ? 'mobile-inner-open' : 'mobile-inner-closed'
            }`}
          >
            <div className='mobile-inner-links'>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    navigate('/info')
                  }, 500)
                }}
              >
                Information
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    navigate('/')
                  }, 500)
                }}
              >
                Work
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    navigate('/journal')
                  }, 500)
                }}
              >
                Journal
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    navigate('/books')
                  }, 500)
                }}
              >
                Books
              </button>
            </div>
            <div className='mobile-inner-middle'>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    navigate('/press')
                  }, 500)
                }}
              >
                PRESS
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    navigate('/news')
                  }, 500)
                }}
              >
                NEWS
              </button>
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

import React, { useEffect, useState } from 'react'

const HideOnScroll = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100)
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible, handleScroll])

  return (
    <div className={`header-logo ${visible ? 'header-show' : 'header-hide'}`}>
      {children}
    </div>
  )
}

export default HideOnScroll

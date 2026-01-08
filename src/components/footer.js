import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import CustomForm from './customForm'
import { Link } from 'gatsby'

const postUrl = process.env.GATSBY_MAIL_KEY

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-left'>
        <div className='footer-links'>
          <div className='footer-column'>
            <Link to='/info' className='footer-link'>
              Information
            </Link>
            <Link to='/work' className='footer-link'>
              Work
            </Link>
            <Link to='/journal' className='footer-link'>
              Journal
            </Link>
            <Link to='/books' className='footer-link'>
              Publishing
            </Link>
          </div>
          <div className='footer-column'>
            <a href='mailto:studio@pacificpacific.pub' className='footer-link'>
              Contact
            </a>
            <a
              href='mailto:business@pacificpacific.pub'
              className='footer-link'
            >
              Careers
            </a>
            <a
              href='https://www.instagram.com/pacific_pacific'
              target='_blank'
              rel='noreferrer'
              className='footer-link'
            >
              Instagram
            </a>
            <a
              href='https://www.linkedin.com/company/pacificpacific/'
              target='_blank'
              rel='noreferrer'
              className='footer-link'
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className='mobile-divider'></div>
        <div className='footer-column'>
          <div className='footer-link footer-p'>Studio</div>
          <a
            href='https://maps.app.goo.gl/8vXst9aKP9nn7rJu5'
            target='_blank'
            rel='noreferrer'
            className='studio-address'
          >
            161 Water St
            <br />
            New York, NY 10038
          </a>
        </div>
        <div className='mobile-divider'></div>
        <div className='footer-column'>
          <div className='footer-link footer-p'>Mailing List</div>
          <MailchimpSubscribe
            url={postUrl}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
              ></CustomForm>
            )}
          />
        </div>
      </div>
      <div className='mobile-divider'></div>
      <div className='footer-right'>
        <div>&copy; Pacific {new Date().getFullYear()}</div>
        <Link to='/privacy'>Privacy</Link>
        <Link to='/shipping'>Shipping</Link>
      </div>
    </footer>
  )
}

export default Footer

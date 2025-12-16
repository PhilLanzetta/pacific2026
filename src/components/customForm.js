import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import Loader from './loader'

const CustomForm = ({ status, message, onValidated, setEmailOpen }) => {
  const [email, setEmail] = useState('')

  if (status === 'success') {
    setTimeout(() => {
      setEmailOpen(false)
    }, 1000)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    email && email.indexOf('@') > -1 && onValidated({ EMAIL: email })
  }

  return (
    <div>
      {status === 'error' && (
        <div
          className='email-pop-up-text'
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'sending' && <Loader></Loader>}
      {status !== 'sending' && status !== 'error' && status !== 'success' && (
        <h3 className='email-pop-up-text'>
          Receive our monthly newsletter,
          <br /> event information and more.
        </h3>
      )}
      {status === 'success' && (
        <div className='email-pop-up-text'>Thank you!</div>
      )}
      {status !== 'success' ? (
        <form
          className='email-pop-up-form'
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <input
            className='email-pop-up-input'
            type='email'
            value={email}
            name='EMAIL'
            placeholder='Email'
            onChange={handleEmailChange}
            required
          />
          <input
            type='text'
            name='b_a3dc4614ab0904a898901e6de_db4bc02555'
            tabIndex='-1'
            value=''
            readOnly
            hidden
          />
          <button type='submit' className='email-submit-button'>
            <BsArrowRight></BsArrowRight>
          </button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default CustomForm

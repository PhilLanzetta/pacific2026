import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Shipping = () => {
  return (
    <Layout>
      <h1 className='privacy-page-title'>Shipping</h1>
      <div className='privacy-container'>
        <p>Shipping: 7-14 Business Days</p>{' '}
        <p>
          RISK OF LOSS <br></br>All products purchased from our website are
          transported and delivered by an independent carrier not affiliated
          with, or controlled by Pacific. Pacific is not responsible for any
          damages to product by shipping companies.
        </p>{' '}
        <p>
          RETURNS <br></br> We do not currently accept online returns
        </p>{' '}
        <p>
          Please contact our customer service team if you have further
          questions.<br></br>{' '}
          <a href='mailto:studio@pacificpacific.pub'>
            studio@pacificpacific.pub
          </a>
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title='Shipping' />

export default Shipping

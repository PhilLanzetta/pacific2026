import * as React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <div className='not-found-container'>
      <h1>404: Not Found</h1>
      <p>Content at that URL no longer exists.</p>
      <Link to='/'>RETURN HOME</Link>
    </div>
  </Layout>
)

export const Head = () => <Seo title='404: Not Found' />

export default NotFoundPage

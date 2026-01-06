import React from 'react'
import Layout from '../components/layout'

const Journal = ({ location }) => {
  return (
    <Layout location={location}>
      <div className='journal-page-container'>
        <div className='journal-filter'>Filter:</div>
      </div>
    </Layout>
  )
}

export default Journal

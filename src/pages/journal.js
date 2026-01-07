import React from 'react'
import Layout from '../components/layout'

const Journal = ({ location }) => {
  const filters = [
    'BRANDING',
    'FILMS',
    'ART',
    'BOOKS',
    'WRITING',
    'SUNDAY READING',
    'TECHNOLOGY',
  ]

  return (
    <Layout location={location}>
      <div className='journal-page-container'>
        <div className='journal-sub-heading'>
          Pacific’s journal is a digital and
          <br />
          print platform where we share...
        </div>
        <div className='journal-filter'>
          <button className='filter-btn-header'>Filter:</button>
          {filters.map((item, index) => (
            <button key={index} className='filter-btn'>{item}</button>
          ))}
        </div>
        <div className='journal-tile-container'></div>
      </div>
    </Layout>
  )
}

export default Journal

import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import JournalTile from '../components/journalTile'

const Journal = ({ location, data }) => {
  const { tiles } = data.contentfulJournalLandingPage
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
            <button key={index} className='filter-btn'>
              {item}
            </button>
          ))}
        </div>
        <div className='journal-tile-container'>
          {tiles.map((tile) => (
            <JournalTile key={tile.id} tile={tile}></JournalTile>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulJournalLandingPage {
      tiles {
        category
        id
        slug
        subtitle
        tileSize
        tileVideoUrl
        title
        tileImage {
          description
          gatsbyImageData
        }
        tileExcerptText {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

export default Journal

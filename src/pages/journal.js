import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import JournalTile from '../components/journalTile'
import Seo from '../components/seo'

const Journal = ({ location, data }) => {
  const [activeFilter, setActiveFilter] = useState()
  const [tiles, setTiles] = useState(data.contentfulJournalLandingPage.tiles)
  const filters = ['Case Study', 'Perspectives', 'Sunday Reading']

  useEffect(() => {
    if (activeFilter) {
      return setTiles(data.contentfulJournalLandingPage.tiles.filter(item => item.category.includes(activeFilter)))
    } else {
      return setTiles(data.contentfulJournalLandingPage.tiles)
    }
  }, [activeFilter])

  return (
    <div className='journal-page-container'>
      <div className='journal-filter-container'>
        <div className='journal-filter'>
          <button
            className={`filter-btn ${
              !activeFilter ? 'active-filter' : 'non-active-filter'
            }`}
            onClick={() => setActiveFilter()}
          >
            All
          </button>
          {filters.map((item, index) => (
            <button
              key={index}
              className={`filter-btn ${
                activeFilter === item ? 'active-filter' : 'non-active-filter'
              }`}
              onClick={() => setActiveFilter(item)}
            >
              {item === 'Case Study' ? 'Case Studies' : item}
            </button>
          ))}
        </div>
      </div>
      <div className='journal-tile-container'>
        {tiles.map((tile) => (
          <JournalTile key={tile.id} tile={tile}></JournalTile>
        ))}
      </div>
    </div>
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
          gatsbyImageData(layout: FULL_WIDTH)
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

export const Head = () => <Seo title='Journal' />

export default Journal

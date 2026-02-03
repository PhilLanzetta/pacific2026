import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import JournalTile from '../components/journalTile'
import Seo from '../components/seo'

const Journal = ({ location, data }) => {
  const [activeFilters, setActiveFilters] = useState([])
  const [tiles, setTiles] = useState(data.contentfulJournalLandingPage.tiles)
  const filters = ['Case Study', 'Perspectives', 'Sunday Reading']

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const handleFilterClick = (item) => {
    if (activeFilters.includes(item)) {
      const newFilters = activeFilters.filter((filter) => filter !== item)
      setActiveFilters(newFilters)
    } else {
      setActiveFilters([...activeFilters, item])
    }
  }

  const filterByType = (array) => {
    return [
      ...array,
      activeFilters
        .map((term) => array.filter((item) => item.category.includes(term)))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const handleFilter = () => {
    let result = data.contentfulJournalLandingPage.tiles
    if (activeFilters.length) {
      result = filterByType(result)
      result = result
        .filter((item) => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    setTiles(result)
  }

  useEffect(() => {
    handleFilter()
  }, [activeFilters])

  console.log(activeFilters)

  return (
    <div className='journal-page-container'>
      <div className='journal-filter-container'>
        <div className='journal-filter'>
          <button
            className='filter-btn-header'
            onClick={() => setActiveFilters([])}
          >
            {activeFilters.length > 0 ? (
              <span>
                <em>Clear Filter</em>
              </span>
            ) : (
              <span>Filter:</span>
            )}
          </button>
          {filters.map((item, index) => (
            <button
              key={index}
              className={`filter-btn ${
                activeFilters.length > 0
                  ? activeFilters.includes(item)
                    ? 'active-filter'
                    : 'non-active-filter'
                  : ''
              }`}
              onClick={() => handleFilterClick(item)}
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

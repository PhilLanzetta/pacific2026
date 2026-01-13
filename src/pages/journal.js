import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import JournalTile from '../components/journalTile'

const Journal = ({ location, data }) => {
  const [activeFilters, setActiveFilters] = useState([])
  const [tiles, setTiles] = useState(data.contentfulJournalLandingPage.tiles)
  const filters = [
    'Branding',
    'Films',
    'Art',
    'Books',
    'Writing',
    'Sunday Reading',
    'Technology',
  ]

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
            <button
              key={index}
              className={`filter-btn ${
                activeFilters.length > 0
                  ? activeFilters.includes(item)
                    ? 'active-filter'
                    : 'non-active-filter'
                  : 'active-filter'
              }`}
              onClick={() => handleFilterClick(item)}
            >
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

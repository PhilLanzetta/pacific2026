import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import ProductTile from '../components/productTile'
import Seo from '../components/seo'

const Books = ({ data, location }) => {
  const initialData = data.shopifyCollection.products
  const [activeFilters, setActiveFilters] = useState([])
  const [products, setProducts] = useState(initialData)
  const filters = [
    'Art',
    'Photography',
    'Design',
    'Writing',
    'Clothing',
    'Rare',
    'Out of Print',
  ]

  console.log(initialData.map((item) => item.tags))

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
        .map((term) => array.filter((item) => item.tags.includes(term)))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const handleFilter = () => {
    let result = initialData
    if (activeFilters.length) {
      result = filterByType(result)
      result = result
        .filter((item) => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    setProducts(result)
  }

  useEffect(() => {
    handleFilter()
  }, [activeFilters])

  return (
      <div className='books-page'>
        <div className='books-sub-heading'>
          Pacific publishes products that
          <br />
          engage societies and shift culture
        </div>
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
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className='product-tiles-container'>
          {products.map((product) => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
      </div>
  )
}

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "everything" }) {
      products {
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        handle
        id
        collections {
          title
        }
        metafields {
          key
          value
        }
        title
        tags
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        totalInventory
      }
    }
  }
`

export default Books

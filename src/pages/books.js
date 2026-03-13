import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import ProductTile from '../components/productTile'
import Seo from '../components/seo'

const Books = ({ data, location }) => {
  const initialData = data.shopifyCollection.products
  const [activeFilter, setActiveFilter] = useState()
  const [products, setProducts] = useState(initialData)
  const filters = [
    'Art',
    'Photography',
    'Design',
    'Writing',
    'Clothing',
    'Out of Print',
  ]

  useEffect(() => {
    if (activeFilter) {
      return setProducts(
        initialData.filter((item) => item.tags.includes(activeFilter)),
      )
    } else {
      return setProducts(initialData)
    }
  }, [activeFilter])

  return (
    <div className='books-page'>
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

export const Head = () => <Seo title='Books' />

export default Books

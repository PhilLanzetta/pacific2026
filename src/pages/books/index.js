import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import ProductTile from '../components/productTile'
import Seo from '../../components/seo'

const Books = ({ data, location }) => {
  const initialData = data.shopifyCollection.products
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

  return (
    <Layout location={location}>
      <div className='books-page'>
        <div className='books-sub-heading'>Shop, About, News, Press</div>
        <div className='journal-filter'>
          <button className='filter-btn-header'>Filter:</button>
          {filters.map((item, index) => (
            <button key={index} className='filter-btn'>
              {item}
            </button>
          ))}
        </div>
        <div className='product-tiles-container'>
          {products.map((product) => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
      </div>
    </Layout>
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

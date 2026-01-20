import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import useWindowSize from '../utils/useWindowSize'
import useStore from '../context/StoreContext'
import RelatedProducts from '../components/relatedProducts'
import Seo from '../components/seo'
import { Fade } from 'react-awesome-reveal'
import { AnimatePresence } from 'framer-motion'
import Cart from '../components/cart'

const ProductPage = ({ location, data }) => {
  const { width } = useWindowSize()
  const [variantIndex, setVariantIndex] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const isMobile = width < 701
  const {
    media,
    title,
    metafields,
    descriptionHtml,
    priceRangeV2,
    totalInventory,
    variants,
    collections,
  } = data.shopifyProduct

  const mediaImages = media.slice(1)
  const firstMedia = mediaImages[0]
  const subsequentMedia = mediaImages.slice(1)

  const { addVariantToCart, cart } = useStore()

  const tagline = metafields.filter(
    (metafield) => metafield.key === 'tagline',
  )[0]?.value

  const externalLink = metafields.filter(
    (metafield) => metafield.key === 'external_link_new',
  )[0]?.value

  const details = metafields.filter(
    (metafield) => metafield.key === 'details',
  )[0]?.value

  const relatedProductsHandles = metafields
    .filter((field) => field.key === 'related_products')[0]
    ?.value.split('|')

  const sizes = variants
    .map((variant) =>
      variant.selectedOptions.filter((option) => option.name === 'Size'),
    )
    .flat()

  return (
    <Layout location={location}>
      <div className='product-page-container'>
        <div className='shop-cart'>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className='shop-bag-button'
          >
            <p>
              Cart{'  '}
              {cart.length > 0 ? (
                <span className='cart-number'>
                  {cart
                    .map((item) => item.quantity)
                    .reduce((prev, next) => prev + next)}
                </span>
              ) : (
                ''
              )}
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='cart-icon'
              viewBox='0 0 43.963 36.303'
            >
              <path
                id='Path_3'
                data-name='Path 3'
                d='M11.785,45.8a.3.3,0,0,0,.114.228v.057l.171.171h.057a.3.3,0,0,0,.228.114h0L35.039,54.35a.514.514,0,0,0,.285.057,1.2,1.2,0,0,0,.627-.228L55.215,34.915a.846.846,0,0,0,.228-.8.9.9,0,0,0-.57-.627l-.912-.228a24.972,24.972,0,0,1-.228-2.964,10.983,10.983,0,0,1,.057-1.368l1.368-1.368a.846.846,0,0,0,.228-.8.9.9,0,0,0-.57-.627L32.132,18.158a.809.809,0,0,0-.912.228L12.013,37.594h0c-.057.057-.114.114-.114.171v.057c0,.057-.057.057-.057.114v.114a21.318,21.318,0,0,0-.342,3.876,21.392,21.392,0,0,0,.285,3.876Zm11.057-3.078L33.5,46.485a25.951,25.951,0,0,0-.228,3.021,19.385,19.385,0,0,0,.171,2.565L14.065,45.231,13.381,45a17.765,17.765,0,0,1-.228-3.078,19.385,19.385,0,0,1,.171-2.565Zm30.036-9.29-1.026,1.026L34.583,51.671c-.057-.684-.114-1.425-.114-2.166a19.608,19.608,0,0,1,.171-2.622l.4.171a.514.514,0,0,0,.285.057,1.2,1.2,0,0,0,.627-.228L46.837,36l5.813-5.813v.171A18.651,18.651,0,0,0,52.878,33.433Z'
                transform='translate(-11.5 -18.104)'
              />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {isCartOpen && (
            <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
          )}
        </AnimatePresence>
        <div className='product-left'>
          {isMobile && (
            <div className='product-first-media'>
              <Fade triggerOnce>
                <GatsbyImage
                  image={
                    firstMedia.image?.localFile?.childImageSharp
                      ?.gatsbyImageData
                  }
                ></GatsbyImage>
              </Fade>
            </div>
          )}
          <div className='product-media'>
            {mediaImages.map((image) => (
              <Fade triggerOnce key={image.id}>
                <GatsbyImage
                  image={
                    image.image?.localFile?.childImageSharp?.gatsbyImageData
                  }
                  className='product-image'
                ></GatsbyImage>
              </Fade>
            ))}
          </div>
        </div>
        <div className='product-right'>
          {tagline ? (
            <div
              className='product-tagline-container'
              dangerouslySetInnerHTML={{ __html: tagline }}
            ></div>
          ) : (
            <h1 className='product-title'>{title}</h1>
          )}
          {priceRangeV2.minVariantPrice.amount > 0 && totalInventory > 0 && (
            <p className='product-price'>
              ${priceRangeV2.minVariantPrice.amount}
            </p>
          )}
          <div
            className='product-description'
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
          {externalLink && isMobile && (
            <div
              className='product-external-link'
              dangerouslySetInnerHTML={{ __html: externalLink }}
            ></div>
          )}
          {totalInventory > 0 && isMobile && (
            <>
              {sizes?.length > 0 && (
                <div className='product-size-container'>
                  <p>Size</p>
                  <p>-</p>
                  <select
                    className='product-size-select'
                    onChange={(e) => setVariantIndex(e.target.value * 1)}
                  >
                    {sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() =>
                  addVariantToCart(data.shopifyProduct, variantIndex, 1)
                }
                className='add-to-cart-btn'
              >
                Add to Cart
              </button>
            </>
          )}
          {isMobile && (
            <div className='product-mobile-media-container'>
              {subsequentMedia.map((image) => (
                <Fade triggerOnce key={image.id}>
                  <GatsbyImage
                    image={
                      image.image?.localFile?.childImageSharp?.gatsbyImageData
                    }
                    className='product-image'
                  ></GatsbyImage>
                </Fade>
              ))}
            </div>
          )}
          {details && (
            <div>
              {isMobile && (
                <div className='product-detail-header'>Product Details</div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: details }}
                className='product-details'
              ></div>
            </div>
          )}
          {externalLink && !isMobile && (
            <div
              className='product-external-link'
              dangerouslySetInnerHTML={{ __html: externalLink }}
            ></div>
          )}
          {totalInventory > 0 && !isMobile && (
            <>
              {sizes?.length > 0 && (
                <div className='product-size-container'>
                  <p>Size</p>
                  <p>-</p>
                  <select
                    className='product-size-select'
                    onChange={(e) => setVariantIndex(e.target.value * 1)}
                  >
                    {sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() =>
                  addVariantToCart(data.shopifyProduct, variantIndex, 1)
                }
                className='add-to-cart-btn'
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
      {relatedProductsHandles?.length > 0 && (
        <RelatedProducts
          productHandles={relatedProductsHandles}
          isMobile={isMobile}
        ></RelatedProducts>
      )}
    </Layout>
  )
}

export const query = graphql`
  query getSingleProduct($handle: String) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      media {
        ... on ShopifyMediaImage {
          id
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      title
      collections {
        title
      }
      metafields {
        key
        value
      }
      vendor
      descriptionHtml
      priceRangeV2 {
        minVariantPrice {
          amount
        }
      }
      totalInventory
      variants {
        shopifyId
        selectedOptions {
          name
          value
        }
      }
    }
    allShopifyCollection(sort: { title: ASC }) {
      nodes {
        id
        title
        handle
      }
    }
  }
`
export const Head = ({ data }) => <Seo title={data.shopifyProduct.title} />

export default ProductPage

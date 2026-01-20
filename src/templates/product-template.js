import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import useWindowSize from '../utils/useWindowSize'
import useStore from '../context/StoreContext'
import RelatedProducts from '../components/relatedProducts'
import Seo from '../components/seo'
import { Fade } from 'react-awesome-reveal'
import Slider from 'react-slick'

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role='button'
      tabIndex={0}
      aria-label='go to next'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 30'
        className='hero-svg'
      >
        <path
          id='Path_118'
          data-name='Path 118'
          d='M0,8,5.436,0,11,8'
          transform='translate(19.688 9.5) rotate(90)'
          fill='none'
        />
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role='button'
      tabIndex={0}
      aria-label='go to previous'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 30'
        className='hero-svg'
      >
        <path
          id='Path_118'
          data-name='Path 118'
          d='M0,0,5.436,8,11,0'
          transform='translate(18.313 9.5) rotate(90)'
          fill='none'
        />
      </svg>
    </div>
  )
}

const ProductPage = ({ location, data }) => {
  const { width } = useWindowSize()
  const [variantIndex, setVariantIndex] = useState(0)
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

  const allCollections = data.allShopifyCollection.nodes

  const filteredCollections = collections.filter(
    (collection) => collection.title !== 'Everything',
  )

  const mediaImages = media.slice(1)
  const firstMedia = mediaImages[0]
  const subsequentMedia = mediaImages.slice(1)
  console.log(firstMedia)

  console.log(media)

  const { addVariantToCart } = useStore()

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

  const settings = {
    slidesToShow: 1,
    infinite: true,
    useTransform: false,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow addClassName='next-button' />,
    prevArrow: <PrevArrow addClassName='prev-button' />,
  }

  return (
    <Layout location={location}>
      <div className='product-page-container'>
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
              {isMobile && <div className='product-detail-header'>Product Details</div>}
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

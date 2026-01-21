import React, { useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Fade } from 'react-awesome-reveal'

const ProductTile = ({ product, relatedProduct }) => {
  const {
    handle,
    featuredImage,
    tags,
    totalInventory,
    priceRangeV2,
    metafields,
  } = product
  const inquire = tags.includes('Inquire')
  const forthcoming = tags.includes('Forthcoming')
  const preSale = tags.includes('Pre-sale')
  const hideOutOfPrint = tags.includes('Hide OUT OF PRINT')
  const notStocked = tags.includes('Not Stocked')

  const tagline = metafields.filter(
    (metafield) => metafield.key === 'tagline',
  )[0]?.value

  const formatter = new Intl.ListFormat('en', {
    style: 'short',
    type: 'conjunction',
  })

  return (
    <Fade
      triggerOnce={true}
      className={relatedProduct ? 'related-product-tile' : 'product-tile'}
    >
      <div>
        <Link to={`/books/${handle}`}>
          <div className='product-tile-image'>
            <GatsbyImage
              image={featuredImage?.localFile.childImageSharp.gatsbyImageData}
            ></GatsbyImage>
            {totalInventory < 1 && notStocked && (
              <div className='sold-out-sticker'>
                Sold <br />
                Out
              </div>
            )}
            {!relatedProduct && (
              <div className='payment-info'>
                {totalInventory > 0 && (
                  <p>${priceRangeV2.minVariantPrice.amount}</p>
                )}
              </div>
            )}
          </div>
          {!relatedProduct && tags && (
            <div className='product-tile-category'>
              {formatter.format(tags)}
            </div>
          )}
          {tagline && (
            <div
              dangerouslySetInnerHTML={{ __html: tagline }}
              className={
                relatedProduct ? 'related-product-title' : 'product-tile-title'
              }
            ></div>
          )}
        </Link>
      </div>
    </Fade>
  )
}

export default ProductTile

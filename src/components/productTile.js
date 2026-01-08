import React, { useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Fade } from 'react-awesome-reveal'

const ProductTile = ({ product }) => {
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
  const [isHovered, setIsHovered] = useState(false)

  const tagline = metafields.filter(
    (metafield) => metafield.key === 'tagline'
  )[0]?.value

  const hoverImage = metafields.filter(
    (metafield) => metafield.key === 'hoverstate_image_url'
  )[0]?.value

  return (
    <Fade triggerOnce={true} className='product-tile'>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/books/${handle}`}>
          <div className='product-tile-image'>
            {isHovered && hoverImage ? (
              <div className='product-tile-hover'>
                <img src={`${hoverImage}&width=800`} alt='secondary'></img>
              </div>
            ) : (
              <GatsbyImage
                image={featuredImage?.localFile.childImageSharp.gatsbyImageData}
              ></GatsbyImage>
            )}
            {totalInventory < 1 && notStocked && (
              <div className='sold-out-sticker'>
                Sold <br />
                Out
              </div>
            )}
          </div>
          <div className='payment-info'>
            {totalInventory > 0 && (
              <p>${priceRangeV2.minVariantPrice.amount}</p>
            )}
            {totalInventory < 1 && (
              <p className='product-status'>
                {inquire && 'Inquire'}
                {forthcoming && 'Forthcoming'} {preSale && 'Pre-sale'}
                {!inquire &&
                  !forthcoming &&
                  !preSale &&
                  !notStocked &&
                  !hideOutOfPrint &&
                  'Out of Print'}
              </p>
            )}
          </div>
          {tagline && (
            <div
              dangerouslySetInnerHTML={{ __html: tagline }}
              className='product-tile-title'
            ></div>
          )}
        </Link>
      </div>
    </Fade>
  )
}

export default ProductTile

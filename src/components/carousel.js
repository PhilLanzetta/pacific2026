import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import useWindowSize from '../utils/useWindowSize'
import ProductTile from './productTile'

const Carousel = ({ data, slideCount, relatedProducts, containerClass }) => {
  const slideRef = useRef()
  const { width } = useWindowSize()

  const settings = {
    slidesToShow: slideCount,
    infinite: true,
    useTransform: false,
    dots: false,
    arrows: false,
    autoplay: relatedProducts ? false : true,
  }

  return (
    <>
      <div
        className={`carousel ${
          relatedProducts ? 'related-carousel' : ''
        } ${containerClass}`}
      >
        <Slider {...settings} ref={slideRef}>
          {relatedProducts
            ? data.map((product) => (
                <ProductTile
                  key={product.id}
                  product={product}
                  relatedProduct={true}
                ></ProductTile>
              ))
            : data.map((image) => (
                <div key={image.id} className='carousel-link'>
                  <GatsbyImage
                    className='carousel-image'
                    image={image.image.gatsbyImageData}
                    alt={image.image.description}
                  ></GatsbyImage>
                  <p className='image-caption'>{image.caption}</p>
                </div>
              ))}
        </Slider>
        <div className='carousel-arrows-container'>
          <button
            className='pub-arrow'
            onClick={() => slideRef.current.slickPrev()}
            aria-label='go to previous'
          >
            <svg
              viewBox='0 0 44 44'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M44 44H0V0H44V44ZM1 43H43V1H1V43ZM27.9121 17.7725L18.9473 21.2881L18.1709 21.5371L18.9473 21.8008L27.9121 25.2578V28.1289L15.4902 22.5771V20.4385L27.9121 14.9014V17.7725Z' />
            </svg>
          </button>
          <button
            className='pub-arrow'
            onClick={() => slideRef.current.slickNext()}
            aria-label='go to next'
          >
            <svg
              viewBox='0 0 44 44'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M44 44H0V0H44V44ZM1 43H43V1H1V43ZM29.542 20.4238V22.5625L16.6074 28.1143V25.3018L26.085 21.7275L26.9639 21.4785L26.085 21.2002L16.6074 17.6846V14.8867L29.542 20.4238Z' />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Carousel

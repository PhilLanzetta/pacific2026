import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import useWindowSize from '../utils/useWindowSize'

const Carousel = ({ data, slideCount }) => {
  const slideRef = useRef()
  const { width } = useWindowSize()

  const settings = {
    slidesToShow: slideCount,
    infinite: true,
    useTransform: false,
    dots: false,
    arrows: false,
    autoplay: true,
  }

  return (
    <>
      <div className='large-margin'>
        <Slider {...settings} ref={slideRef}>
          {data.map((image) => (
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
        {width > 600 && (
          <div className='carousel-arrows-container'>
            <button
              className='pub-arrow'
              onClick={() => slideRef.current.slickPrev()}
              aria-label='go to previous'
            >
              <BsArrowLeft></BsArrowLeft>
            </button>
            <button
              className='pub-arrow'
              onClick={() => slideRef.current.slickNext()}
              aria-label='go to next'
            >
              <BsArrowRight></BsArrowRight>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Carousel

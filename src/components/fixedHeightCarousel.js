import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import * as styles from './variedWidthCarousel.module.css'
import useWindowSize from '../utils/useWindowSize'

const FixedHeightCarousel = ({ images, containerClass }) => {
  const { height, width } = useWindowSize()
  const isMobile = height > width
  const slideRef = useRef()

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    autoplay: false,
    useTransform: false,
    dots: false,
    arrows: false,
    variableWidth: true,
  }

  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    autoplay: false,
    useTransform: false,
    dots: false,
    arrows: false,
  }

  return (
    <div className={styles.sliderContainer}>
      {isMobile ? (
        <div className={`carousel ${containerClass}`}>
          <Slider {...mobileSettings} ref={slideRef}>
            {images?.map((image) => {
              return (
                <div key={image.id} className={styles.slide}>
                  <div
                    className={styles.slideContainer}
                    style={{ marginRight: '10px' }}
                  >
                    <figure style={{ width: '100%' }}>
                      <GatsbyImage
                        image={image.image?.gatsbyImageData}
                        alt={image.image?.description}
                        style={{ width: '100%' }}
                      ></GatsbyImage>
                      {image.caption && (
                        <figcaption className='image-caption'>
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      ) : (
        <div className={`carousel ${containerClass}`}>
          <Slider {...settings} style={{ height: '50vh' }} ref={slideRef}>
            {images?.map((image) => {
              const imgWidth = (image.image?.width * 50) / image.image?.height
              return (
                <div
                  key={image.id}
                  style={{
                    width: `calc(${imgWidth}vh + 20px)`,
                  }}
                  className={styles.slide}
                >
                  <div className={styles.slideContainer}>
                    <figure>
                      <GatsbyImage
                        image={image.image?.gatsbyImageData}
                        alt={image.image?.description}
                        style={{
                          height: '50vh',
                          width: `${imgWidth}vh`,
                        }}
                      ></GatsbyImage>
                      {image.caption && (
                        <figcaption className='image-caption'>
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  </div>
                </div>
              )
            })}
          </Slider>
          <div className='carousel-arrows-container-fixed'>
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
      )}
    </div>
  )
}

export default FixedHeightCarousel

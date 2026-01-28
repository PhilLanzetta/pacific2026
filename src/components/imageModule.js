import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Fade } from 'react-awesome-reveal'
import Carousel from './carousel'

const ImageModule = ({ content }) => {
  let containerClass
  if (content.containerWidth) {
    if (content.containerWidth === 'Text Width') {
      containerClass = 'large-padding'
    } else if (content.containerWidth === '50%') {
      containerClass = 'image-module-50'
    } else if (content.containerWidth === '75%') {
      containerClass = 'image-module-75'
    } else {
      containerClass = 'full-width'
    }
  } else {
    containerClass = 'full-width'
  }
  return (
    <Fade triggerOnce className='image-module-outer'>
      {content.isACarousel ? (
        <Carousel
          data={content.images}
          slideCount={1}
          containerClass={containerClass}
        ></Carousel>
      ) : (
        <div className={`image-module-container ${containerClass}`}>
          {content.images.map((image, index) => (
            <figure
              key={index}
              className={
                content.imgColumns
                  ? `image-module-${content.imgColumns}`
                  : 'image-module-figure'
              }
            >
              <GatsbyImage
                image={image.image?.gatsbyImageData}
                alt={image.image?.description}
                className='image-module-gatsby-image'
              ></GatsbyImage>
              {image.caption && (
                <figcaption className='image-caption'>
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </Fade>
  )
}

export default ImageModule

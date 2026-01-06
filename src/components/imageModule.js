import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Fade } from 'react-awesome-reveal'
import Carousel from './carousel'

const ImageModule = ({ content }) => {
  return (
    <Fade triggerOnce className='image-module-outer'>
      {content.isACarousel ? (
        <Carousel data={content.images} slideCount={1}></Carousel>
      ) : (
        <div
          className={`image-module-container ${
            content.fullBleed ? '' : 'large-margin'
          }`}
        >
          {content.images.map((image, index) => (
            <figure
              key={index}
              className={
                content.columns
                  ? `image-module-${content.columns}`
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

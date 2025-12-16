import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Fade } from 'react-awesome-reveal'
import Carousel from './carousel'

const ImageModule = ({ content }) => {
  return (
    <Fade triggerOnce>
      {content.isACarousel ? (
        <Carousel data={content.images} slideCount={1}></Carousel>
      ) : (
        <div
          className={`image-module-container ${
            content.fullBleed ? '' : 'normal-margin'
          }`}
        >
          {content.images.map((image, index) => (
            <figure key={index} className={`image-module-${content.columns}`}>
              <GatsbyImage
                image={image.image?.gatsbyImageData}
                alt={image.image?.description}
              ></GatsbyImage>
              <figcaption className='image-caption'>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </Fade>
  )
}

export default ImageModule

import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Slider from 'react-slick'

const RelatedCarousel = ({ data, slideCount }) => {
  const settings = {
    slidesToShow: slideCount,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1.45,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {data.map((related) => (
        <Link
          to={`/studio/${related.slug}`}
          key={related.id}
          className='featured-shop-link'
        >
          <GatsbyImage
            className='carousel-image-related'
            image={related.tileImage.image.gatsbyImageData}
            alt={related.tileImage.image.description}
          ></GatsbyImage>
          <p className='carousel-title'>{related.title}</p>
          <p className='carousel-subtitle'>{related.subtitle}</p>
        </Link>
      ))}
    </Slider>
  )
}

export default RelatedCarousel

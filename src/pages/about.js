import React from 'react'
import Layout from '../components/layout'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BsArrowRight } from 'react-icons/bs'
import Slider from 'react-slick'
import Seo from '../components/seo'

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

const About = ({ data }) => {
  const {
    aboveTheFoldText,
    aboutText,
    adamBio,
    adamHeadshot,
    lizBio,
    lizHeadshot,
    artists,
    awards,
    brandingServices,
    printServices,
    experientialServices,
    digitalServices,
    selectClients,
    studioImages,
    collections,
    publishing,
    talksLectures,
  } = data.contentfulAboutPage

  const settings = {
    nextArrow: <NextArrow addClassName='next-button' />,
    prevArrow: <PrevArrow addClassName='prev-button' />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.15,
          infinite: false,
          arrows: false,
        },
      },
    ],
  }

  return (
    <Layout>
      <div className='about-page'>
        <div
          className='about-above-the-fold'
          dangerouslySetInnerHTML={{
            __html: aboveTheFoldText.childMarkdownRemark.html,
          }}
        ></div>
        {/* <div>
          <h2 className='about-section-title'>About</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: aboutText.childMarkdownRemark.html,
            }}
            className='about-text'
          ></div>
        </div>
        <div>
          <h2 className='about-section-title'>Publishing</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: publishing.childMarkdownRemark.html,
            }}
            className='about-text'
          ></div>
        </div> */}
        <div>
          <h2 className='about-section-title'>Services</h2>
          <div className='about-services'>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Branding</h3>
              <ul className='about-service-list'>
                {brandingServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Print</h3>
              <ul className='about-service-list'>
                {printServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Digital</h3>
              <ul className='about-service-list'>
                {digitalServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Experiential</h3>
              <ul className='about-service-list'>
                {experientialServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Select Clients</h2>
          <ul
            className='four-column-container'
            dangerouslySetInnerHTML={{
              __html: selectClients.childMarkdownRemark.html.replace(
                /href/g,
                "target='_blank' rel='noreferrer' href"
              ),
            }}
          ></ul>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Founders</h2>
          <div className='founders-container'>
            <div className='founder'>
              <GatsbyImage
                image={lizHeadshot.gatsbyImageData}
                alt={lizHeadshot.description}
              ></GatsbyImage>
              <div
                className='founder-bio'
                dangerouslySetInnerHTML={{
                  __html: lizBio.childMarkdownRemark.html,
                }}
              ></div>
            </div>
            <div className='founder'>
              <GatsbyImage
                image={adamHeadshot.gatsbyImageData}
                alt={adamHeadshot.description}
              ></GatsbyImage>
              <div
                dangerouslySetInnerHTML={{
                  __html: adamBio.childMarkdownRemark.html,
                }}
                className='founder-bio'
              ></div>
            </div>
          </div>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Awards</h2>
          <ul className='four-column-container'>
            {awards.map((award, index) => (
              <li key={index} className='about-award'>
                {award}
              </li>
            ))}
          </ul>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Collections</h2>
          <div className='collections-container'>
            <div className='collections-preface'>
              Our design and publishing work is held in the following
              collections
            </div>
            <ul className='collections-list'>
              {collections.map((collection, index) => (
                <li key={index}>{collection}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Artists</h2>
          <ul
            className='four-column-container'
            dangerouslySetInnerHTML={{
              __html: artists.childMarkdownRemark.html.replace(
                /href/g,
                "target='_blank' rel='noreferrer' href"
              ),
            }}
          ></ul>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Talks & Lectures</h2>
          <div
            className='four-column-container talks-lectures'
            dangerouslySetInnerHTML={{
              __html: talksLectures.childMarkdownRemark.html,
            }}
          ></div>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Press</h2>
          <Link to='/press' className='press-link'>
            <BsArrowRight></BsArrowRight>View our press page
          </Link>
        </div>

        <div className='about-section'>
          <h2 className='about-section-title'>Studio</h2>
          <Slider {...settings} className='about-slider'>
            {studioImages.map((image, index) => (
              <div className='studio-carousel-image' key={index}>
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.description}
                ></GatsbyImage>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      aboutText {
        childMarkdownRemark {
          html
        }
      }
      publishing {
        childMarkdownRemark {
          html
        }
      }
      aboveTheFoldText {
        childMarkdownRemark {
          html
        }
      }
      adamBio {
        childMarkdownRemark {
          html
        }
      }
      adamHeadshot {
        gatsbyImageData
        description
      }
      artists {
        childMarkdownRemark {
          html
        }
      }
      awards
      brandingServices
      collections
      digitalServices
      experientialServices
      id
      lizBio {
        childMarkdownRemark {
          html
        }
      }
      lizHeadshot {
        description
        gatsbyImageData
      }
      studioImages {
        description
        gatsbyImageData
      }
      talksLectures {
        childMarkdownRemark {
          html
        }
      }
      selectClients {
        childMarkdownRemark {
          html
        }
      }
      printServices
    }
  }
`
export const Head = () => <Seo title='About' />

export default About

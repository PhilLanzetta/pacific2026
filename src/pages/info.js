import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { GatsbyImage } from 'gatsby-plugin-image'
import { AnimatePresence, motion } from 'framer-motion'

const Info = ({ data, location }) => {
  const {
    brandingServices,
    selectClients,
    lizHeadshot,
    adamHeadshot,
    lizBio,
    adamBio,
    talksLectures,
  } = data.contentfulAboutPage
  const [adamPopUp, setAdamPopUp] = useState(false)
  const [lizPopUp, setLizPopUp] = useState(false)

  return (
    <Layout location={location}>
      <div className='info-container'>
        <div className='info-column info-left-column'>
          <div className='info-text'>
            <p>
              Pacific is an internationally recognized creative agency based in
              New York City, led by{' '}
              <button
                onClick={() => setAdamPopUp(true)}
                aria-label='open bio'
                className='info-popup-btn'
              >
                Adam Turnbull
              </button>{' '}
              and{' '}
              <button
                onClick={() => setLizPopUp(true)}
                aria-label='open bio'
                className='info-popup-btn'
              >
                Elizabeth Karp-Evans
              </button>
              .
            </p>
            <p>
              We collaborate with commercial and cultural clients across
              disciplines to design for global audiences. Our team of writers,
              designers, developers and directors are dedicated to crafting
              meaningful, rigorous and lasting work that engages society and
              shifts culture. We embrace complexity and believe purposeful
              creative expression has a profound ability to define values and
              influence growth.
            </p>{' '}
            <p>
              Pacific has earned accolades for its work in branding, digital,
              publishing and print design from D&AD, Art Directors Club, Type
              Directors Club New York and the American Institute of Graphic
              Arts.
            </p>
          </div>
        </div>
        <div className='info-column'>
          <div className='info-right-column'>
            <div>
              <p className='info-heading'>Services</p>
              <ul className='info-list'>
                {brandingServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className='info-heading'>Awards</p>
              <ul
                className='info-list'
                dangerouslySetInnerHTML={{
                  __html: talksLectures.childMarkdownRemark.html,
                }}
              ></ul>
            </div>
          </div>
          <div className='info-right-column'>
            <p className='info-heading'>Select Clients</p>
            <ul
              className='info-list'
              dangerouslySetInnerHTML={{
                __html: selectClients.childMarkdownRemark.html.replace(
                  /href/g,
                  "target='_blank' rel='noreferrer' href"
                ),
              }}
            ></ul>
          </div>
          <div className='info-right-column'>
            <p className='mobile-hide'>
              Office
              <br />
              <a
                href='https://maps.app.goo.gl/8vXst9aKP9nn7rJu5'
                target='_blank'
                rel='noreferrer'
              >
                161 Water St
                <br />
                New York, NY 10038
              </a>
            </p>
            <p className='mobile-hide'>
              Contact <br />
              <a href='mailto:studio@pacificpacific.pub'>
                studio@pacificpacific.pub
              </a>
              <br />
              <a href='mailto:business@pacificpacific.pub'>
                business@pacificpacific.pub
              </a>
            </p>
            <p className='mobile-hide'>
              Social <br />
              <a
                href='https://www.instagram.com/pacific_studio/'
                target='_blank'
                rel='noreferrer'
              >
                Instagram: @pacific_studio
              </a>
              <br />
              <a
                href='https://www.linkedin.com/company/pacificpacific/'
                target='_blank'
                rel='noreferrer'
              >
                LinkedIn: @pacific_pacific
              </a>
            </p>
            <p>
              <a
                href='https://www.pacificpacific.pub'
                target='_blank'
                rel='noreferrer'
              >
                Pacific Books &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {lizPopUp && (
          <motion.div className='info-partners'>
            <button
              className='bio-popup-close'
              onClick={() => setLizPopUp(false)}
            >
              X Close
            </button>
            <div></div>
            <div>
              <GatsbyImage
                image={lizHeadshot.gatsbyImageData}
                alt={lizHeadshot.description}
              ></GatsbyImage>
              <p className='info-caption'>Photo: Ned Rogers</p>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: lizBio.childMarkdownRemark.html,
              }}
              className='info-bio'
            ></div>
          </motion.div>
        )}
        {adamPopUp && (
          <motion.div
            className='info-partners'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className='bio-popup-close'
              onClick={() => setAdamPopUp(false)}
            >
              X Close
            </button>
            <div></div>
            <div>
              <GatsbyImage
                image={adamHeadshot.gatsbyImageData}
                alt={adamHeadshot.description}
              ></GatsbyImage>
              <p className='info-caption'>Photo: Nick Brinley</p>
            </div>
            <div
              className='info-bio'
              dangerouslySetInnerHTML={{
                __html: adamBio.childMarkdownRemark.html,
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage(title: { eq: "Studio About Page" }) {
      aboutText {
        childMarkdownRemark {
          html
        }
      }
      awards
      brandingServices
      id
      selectClients {
        childMarkdownRemark {
          html
        }
      }
      lizBio {
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
      lizHeadshot {
        gatsbyImageData
        description
      }
      talksLectures {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
export const Head = () => <Seo title='About' />

export default Info
